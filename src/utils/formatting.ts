import { format } from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserCSS from 'prettier/plugins/postcss';
import parserMarkdown from 'prettier/plugins/markdown';
import parserGraphQL from 'prettier/plugins/graphql';
import parserTypeScript from 'prettier/plugins/typescript';
import parserPHP from '@prettier/plugin-php';
import estreePlugin from 'prettier/plugins/estree';

export async function formatCode(code: string, language: string) {
  try {
    let parser;
    const plugins = [estreePlugin];

    switch (language) {
      case 'css':
        parser = 'css';
        plugins.push(parserCSS);
        break;
      case 'markdown':
        parser = 'markdown';
        plugins.push(parserMarkdown);
        break;
      case 'graphql':
        parser = 'graphql';
        plugins.push(parserGraphQL);
        break;
      case 'typescript':
        parser = 'typescript';
        plugins.push(parserTypeScript);
        break;
      case 'php':
        parser = 'php';
        plugins.push(parserPHP);
        break;
      default:
        parser = 'babel';
        plugins.push(parserBabel);
    }

    return await format(code, {
      parser,
      plugins,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

/*
Below is a list of languages that hljs can detect and which one's the app currently supports 
xml
bash
c
cpp
csharp
[x] markdown
diff
ruby
go
[X] graphql
ini
java
[x] javascript
json
kotlin
less
lua
makefile
perl
objectivec
[X] php
php-template
plaintext
python
python-repl
r
rust
scss
shell
sql
swift
yaml
[X] typescript
vbnet
wasm
*/
