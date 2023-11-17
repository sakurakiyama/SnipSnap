import { format } from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserCSS from 'prettier/parser-postcss';
import parserMarkdown from 'prettier/parser-markdown';
import parserGraphQL from 'prettier/parser-graphql';
import parserTypeScript from 'prettier/parser-typescript';
import estreePlugin from 'prettier/plugins/estree';

export async function formatCode(code: string, language: string) {
  try {
    console.log(language);
    let parser;
    const plugins = [];

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
        plugins.push(parserBabel, estreePlugin);
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
