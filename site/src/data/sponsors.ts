export interface Sponsor {
  /** Stable React key */
  key: string;
  /** Display name shown under the avatar */
  name: string;
  /** GitHub username — avatar resolves to https://github.com/<github>.png */
  github: string;
  /** Optional override link (defaults to the GitHub profile) */
  href?: string;
}

export const sponsors: Sponsor[] = [{ key: "kastov", name: "kastov", github: "kastov" }];
