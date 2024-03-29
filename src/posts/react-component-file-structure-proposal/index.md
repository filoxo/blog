---
title: React component file structure proposal
date: 2022-08-12
tags: ['react', 'typescript', 'testing']
---

This is an attempt at a proposal for organizing a React component file structure based on the needs and current patterns at JupiterOne.<!-- excerpt-end -->

I'm sharing this first on my blog to get some external feedback, but I also think its a good discussion point in general. For context, our tech stack uses the following: TypeScript, React, Jest, and Storybook. The idea is that this code will be generated as part of a code generator (such as [yeoman](https://yeoman.io/)).

In the remainder of this document, `Foo` will be used to represent the user-supplied name.

The pattern has the following file structure and naming:

```sh
{Foo}/
├──index.tsx
├──use{Foo}Logic.ts
├──use{Foo}Logic.test.tsx
├──{Foo}Component.tsx
└──{Foo}Component.stories.tsx
```

## Reasoning

- index.tsx helps make importing simple, eg. `import { Foo } from './Foo'`
- _'use{Foo}Logic'_ encourages colocating business logic with its unit test (Jest)
- _'{Foo}Component'_ encourages colocating UI-related code with its corresponding story (Storybook)
- Generating a component as part of developer onboarding experience would be a great primer for how these should work and establish best practices

## File contents

To better illustrate the need for such a pattern, I've filled in the contents of the files below.

### index.tsx

All this file does is export the hooked component, and creates a type for props.

```tsx
import { FooComponent } from './FooComponent';
import { useFooLogic } from './useFooLogic';

// NOTE: having this into index.ts creates a circular dependency.
// I'm unsure whether this is okay given that this is just a Type, which is not included in compiled code...
// but makes for a better match for condensed file structure (see below). Alternatively this could be
// colocated in use{Foo}Logic file.
export type FooProps = ReturnType<typeof useFooLogic>;

export const Foo = withHookHoc(FooComponent, useFooLogic);
```

### use{Foo}Logic.ts

This file should only contain business logic. Its return value will be passed as props to the component. The extra "Logic" suffix can serve as a constant reminder, but may not actually be necessary as React hooks are intended to be thought of as containing component logic. TBD perhaps.

```ts
import React from 'react';

export const useFooLogic = () => {
  return {};
};
```

### use{Foo}Logic.test.ts

```ts
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFooLogic } from './useFooLogic';
import type { FooProps } from '.';

describe(useFooLogic, () => {
  const mockProps: FooProps = {};

  const render = (testProps: Partial<FooProps> = {}) => {
    return renderHook(useFooLogic, {
      initialProps: {
        ...mockProps,
        ...testProps,
      },
    });
  };

  it('returns valid default props', async () => {
    const { result } = render();

    expect(result.current).toBeDefined(); // TODO: have a better default test...
  });
});
```

Additional ideas:

- optionally allow generating Apollo MockedProvider code & wrapper
- optionally allow generating react-router MemoryRouter code & wrapper

### {Foo}Component.tsx

The extra "Component" suffix helps remind the developer that only the component code should be here, though it does look a bit awkward at first glance. Alternative ways to think about this is that this is "headless component" that contains next-to-no logic (though not always avoidable).

```tsx
import React from 'react';
import { withHookHoc } from '@jupiterone/web-apps-core';
import { makeUseStyles } from '@jupiterone/web-juno';
import type { FooProps } from '.';

const useStyles = makeUseStyles((theme) => {
  return {};
});

export const FooComponent = (props: FooProps) => {
  const styles = useStyles();
  return <></>;
};
```

### {Foo}Component.stories.tsx

```tsx
import React from 'react';
import { storybookTemplate } from '@jupiterone/web-apps-core';
import { FooComponent } from './FooComponent';
import type { FooProps } from '.';

// TODO: update storybookTemplate to accept typings
const { template, meta } = storybookTemplate<FooProps>({
  title: 'Foo',
  component: FooComponent,
});

export default meta;
export const Default = template({});
```

## Extra credit: condensed file structure

If, say, you have a very simple component that doesn't need 5 files... just reduce it down to the one index file but retaining the file names for tests.

```sh
{Foo}/
├──index.tsx
├──use{Foo}Logic.test.tsx
└──{Foo}Component.stories.tsx
```

### index.tsx

```tsx
import React from 'react';
import React from 'react';
import { withHookHoc } from '@jupiterone/web-apps-core';
import { makeUseStyles } from '@jupiterone/web-juno';

/* --- Logic --- */
export const useFooLogic = () => {
  return {};
};

export type FooProps = ReturnType<typeof useFooLogic>;

/* --- Component --- */
const useStyles = makeUseStyles((theme) => {
  return {};
});

export const FooComponent = (props: FooProps) => {
  const styles = useStyles();
  return <></>;
};

export const Foo = withHookHoc(FooComponent, useFooLogic);
```

### use{Foo}Logic.test.ts

```ts
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFooLogic } from '.';
import type { FooProps } from '.';

describe(useFooLogic, () => {
  const mockProps: FooProps = {};

  const render = (testProps: Partial<FooProps> = {}) => {
    return renderHook(useFooLogic, {
      initialProps: {
        ...mockProps,
        ...testProps,
      },
    });
  };

  it('returns valid default props', async () => {
    const { result } = render();

    expect(result.current).toBeDefined();
  });
});
```

### {Foo}Component.stories.tsx

```tsx
import React from 'react';
import { storybookTemplate } from '@jupiterone/web-apps-core';
import { FooComponent } from '.';
import type { FooProps } from '.';

// TODO: update storybookTemplate to accept typings
const { template, meta } = storybookTemplate<FooProps>({
  title: 'Foo',
  component: FooComponent,
});

export default meta;
export const Default = template({});
```

What do you think? Would you use a codebase structured like this?
