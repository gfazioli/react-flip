import { describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flip } from "../src";

// Two-faces helper: each test must spread these directly inside <Flip> because
// Flip uses React.Children.toArray to detect the front/back panes.
const FRONT = (
  <div key="front" data-testid="front">
    Front
  </div>
);
const BACK = (
  <div key="back" data-testid="back">
    Back
  </div>
);

describe("Flip", () => {
  it("renders both faces", () => {
    render(
      <Flip>
        {FRONT}
        {BACK}
      </Flip>,
    );
    expect(screen.getByTestId("front")).toBeInTheDocument();
    expect(screen.getByTestId("back")).toBeInTheDocument();
  });

  it("throws when given fewer or more than 2 children", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Flip>
          <div>only one</div>
        </Flip>,
      ),
    ).toThrow(/exactly two children/);
    consoleError.mockRestore();
  });

  it("forwards CSS variables for perspective, duration, and easing", () => {
    const { container } = render(
      <Flip perspective="600px" duration={1.5} easing="linear">
        {FRONT}
        {BACK}
      </Flip>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue("--rfp-perspective")).toBe("600px");
    expect(root.style.getPropertyValue("--rfp-duration")).toBe("1.5s");
    expect(root.style.getPropertyValue("--rfp-easing")).toBe("linear");
  });

  it("uses defaultFlipped to set initial uncontrolled state", () => {
    const { container } = render(
      <Flip defaultFlipped>
        {FRONT}
        {BACK}
      </Flip>,
    );
    const flipContainer = container.querySelector(".flipContainer") as HTMLElement;
    expect(flipContainer.style.transform).toContain("rotateY(-180deg)");
  });

  it("renders horizontal direction by default (rotateY)", () => {
    const { container } = render(
      <Flip defaultFlipped>
        {FRONT}
        {BACK}
      </Flip>,
    );
    const flipContainer = container.querySelector(".flipContainer") as HTMLElement;
    expect(flipContainer.style.transform).toContain("rotateY");
  });

  it("renders vertical direction with rotateX", () => {
    const { container } = render(
      <Flip direction="vertical" defaultFlipped>
        {FRONT}
        {BACK}
      </Flip>,
    );
    const flipContainer = container.querySelector(".flipContainer") as HTMLElement;
    expect(flipContainer.style.transform).toContain("rotateX");
  });

  it("flips when Flip.Target is clicked (uncontrolled) and fires onChange/onBack/onFront", async () => {
    const onChange = vi.fn();
    const onBack = vi.fn();
    const onFront = vi.fn();
    const user = userEvent.setup();

    render(
      <Flip onChange={onChange} onBack={onBack} onFront={onFront}>
        <div>
          Front
          <Flip.Target>
            <button type="button">flip</button>
          </Flip.Target>
        </div>
        <div>Back</div>
      </Flip>,
    );

    const button = screen.getByRole("button", { name: /flip/i });
    await user.click(button);

    expect(onChange).toHaveBeenCalledWith(true);
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onFront).not.toHaveBeenCalled();

    await user.click(button);
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(onFront).toHaveBeenCalledTimes(1);
  });

  it("respects controlled `flipped` prop", async () => {
    const user = userEvent.setup();

    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(o => !o)}>
            external
          </button>
          <Flip flipped={open}>
            <div>Front</div>
            <div>Back</div>
          </Flip>
        </>
      );
    }

    const { container } = render(<Controlled />);
    const flipContainer = container.querySelector(".flipContainer") as HTMLElement;
    expect(flipContainer.style.transform).toContain("rotateY(0deg)");

    await user.click(screen.getByRole("button", { name: /external/i }));
    expect(flipContainer.style.transform).toContain("rotateY(-180deg)");
  });

  it("preserves existing onClick on Flip.Target child", async () => {
    const user = userEvent.setup();
    const userClick = vi.fn();
    const onChange = vi.fn();

    render(
      <Flip onChange={onChange}>
        <div>
          Front
          <Flip.Target>
            <button type="button" onClick={userClick}>
              flip
            </button>
          </Flip.Target>
        </div>
        <div>Back</div>
      </Flip>,
    );

    await user.click(screen.getByRole("button", { name: /flip/i }));
    expect(userClick).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("Flip.Target throws on non-element children", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Flip>
          <div>
            Front
            <Flip.Target>plain string is not allowed</Flip.Target>
          </div>
          <div>Back</div>
        </Flip>,
      ),
    ).toThrow(/should be an element/);
    consoleError.mockRestore();
  });

  it("forwards ref to root element", () => {
    let captured: HTMLDivElement | null = null;
    render(
      <Flip
        ref={(el) => {
          captured = el;
        }}
      >
        {FRONT}
        {BACK}
      </Flip>,
    );
    expect(captured).not.toBeNull();
    expect(captured!.tagName).toBe("DIV");
  });
});
