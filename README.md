# @nuraindev/github-packages

A React Native HelloWorld button component published via GitHub Packages.

## Installation

Add the GitHub Packages registry to your project's `.npmrc`:

```
@nuraindev:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @nuraindev/github-packages
```

## Usage

```tsx
import { HelloWorldButton } from "@nuraindev/github-packages";

export default function App() {
  return <HelloWorldButton />;
}
```

## Publishing

This package is automatically published to GitHub Packages when you create a new release on GitHub.

## License

MIT
