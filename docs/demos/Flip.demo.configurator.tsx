import { Flip } from '@gfazioli/react-flip';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Flip {...props} style={{ width: 400, height: 250 }}>
        <div
          style={{
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div>
            <img
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="Norway"
              style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              marginBottom: '12px',
            }}
          >
            <div style={{ fontWeight: 500 }}>Norway Fjord Adventures</div>
            <div
              style={{
                backgroundColor: 'rgba(255, 192, 203, 0.1)',
                color: 'pink',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              On Sale
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#868e96' }}>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Flip.Target>
              <button
                type="button"
                style={{
                  backgroundColor: '#228be6',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  marginTop: '16px',
                  cursor: 'pointer',
                }}
              >
                Edit Widget
              </button>
            </Flip.Target>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#25262b',
            border: '1px solid #373A40',
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Edit Widget</h4>
            <div style={{ color: '#909296', fontSize: '14px' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
            </div>
            <label style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked />
              Display image
            </label>
            <label style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" />
              Auto play
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Flip.Target>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#fa5252',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    marginTop: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </Flip.Target>
            </div>
          </div>
        </div>
      </Flip>
    </div>
  );
}

const code = `
import { Flip } from '@gfazioli/react-flip'';

function Demo() {
  return (
    <Center>
      <Flip h={200} w={400}{{props}}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>

          <Text size="sm" c="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>

          <Group justify="right">
            <Flip.Target>
              <Button color="blue" mt="md" radius="md">
                Edit Widget
              </Button>
            </Flip.Target>
          </Group>
        </Card>

        <Paper bg="dark" radius="md" withBorder p="lg">
          <Stack>
            <Title order={4} c="white">
              Edit Widget
            </Title>
            <Text c="gray" size="sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
            </Text>
            <Switch c="white" defaultChecked label="Display image" />
            <Switch c="white" label="Auto play" />
            <Group justify="left">
              <Flip.Target>
                <Button color="red" mt="md" radius="md">Close</Button>
              </Flip.Target>
            </Group>
          </Stack>
        </Paper>
      </Flip>
    </Center>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'direction',
      type: 'select',
      data: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
    },
    {
      prop: 'directionFlipIn',
      type: 'select',
      data: [
        { label: 'Negative', value: 'negative' },
        { label: 'Positive', value: 'positive' },
      ],
      initialValue: 'negative',
      libraryValue: 'negative',
    },
    {
      prop: 'directionFlipOut',
      type: 'select',
      data: [
        { label: 'Positive', value: 'positive' },
        { label: 'Negative', value: 'negative' },
      ],
      initialValue: 'positive',
      libraryValue: 'positive',
    },
    {
      prop: 'easing',
      type: 'select',
      data: [
        { label: 'Ease', value: 'ease' },
        { label: 'Ease-in', value: 'ease-in' },
        { label: 'Ease-out', value: 'ease-out' },
        { label: 'Ease-in-out', value: 'ease-in-out' },
        { label: 'Linear', value: 'linear' },
      ],
      initialValue: 'ease-in-out',
      libraryValue: 'ease-in-out',
    },
    { prop: 'perspective', type: 'string', initialValue: '1000px', libraryValue: '1000px' },
    {
      prop: 'duration',
      type: 'number',
      initialValue: 0.8,
      libraryValue: 0.8,
      step: 0.1,
      min: 0,
      max: 10,
    },
  ],
};
