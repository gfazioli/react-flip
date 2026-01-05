import { Image } from '@mantine/core';
import { DocsTabs } from '../components/DocsTabs';
import { PageHeader } from '../components/PageHeader';
import { Shell } from '../components/Shell';
import { PACKAGE_DATA } from '../data';
import docgen from '../docgen.json';
import Docs from '../docs.mdx';

export default function HomePage() {
  return (
    <Shell>
      <Image
        h={300}
        src="https://private-user-images.githubusercontent.com/432181/522538183-e4577e9a-b301-49f7-b4d4-62568c1fd69c.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njc2Mzc0NzQsIm5iZiI6MTc2NzYzNzE3NCwicGF0aCI6Ii80MzIxODEvNTIyNTM4MTgzLWU0NTc3ZTlhLWIzMDEtNDlmNy1iNGQ0LTYyNTY4YzFmZDY5Yy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTA1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDEwNVQxODE5MzRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lMjVmOWJjM2I4NzExZjQ1NDIyZGE1YjY2ZWUyNTZlZmU1YmRkOTllMGZkMGUzNTYyOWFlYzBiMDA4YjU1ZDM3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.7QOrSOnAbtPPsyXLX4HfHGwJm3dvho36LstOLp5d2G0"
      />
      <PageHeader data={PACKAGE_DATA} />
      <DocsTabs
        docgen={docgen}
        componentsProps={['Flip']}
        componentsStyles={['Flip']}
        componentPrefix="Flip"
      >
        <Docs />
      </DocsTabs>
    </Shell>
  );
}
