import { format } from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserCSS from 'prettier/plugins/postcss';
import parserMarkdown from 'prettier/plugins/markdown';
import parserGraphQL from 'prettier/plugins/graphql';
import parserTypeScript from 'prettier/plugins/typescript';
import estreePlugin from 'prettier/plugins/estree';

export async function formatCode(code: string, language: string) {
  try {
    console.log(language);
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
      default:
        parser = 'babel';
        plugins.push(parserBabel);
    }

    return await format(code, {
      parser,
      plugins,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
