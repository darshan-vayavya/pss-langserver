/*
 * Copyright (C) 2025 Darshan(@thisisthedarshan)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { BailErrorStrategy, CharStream, CommonTokenStream, ErrorStrategy, PredictionMode } from "antlr4";
import pss, { Enum_identifierContext, IdentifierContext, Stream_type_identifierContext } from "../grammar/pss";
import pss_lexer from "../grammar/pssLex";
import { visitor } from "./visitors";
import { metaData } from "../definitions/dataTypes";
import { PSSErrorListener } from "./listener";
import { PSSLangObjects } from "../definitions/dataStructures";
import { advancedVisitor } from "./advancedVisitor";
import { writeFileSync } from "fs-extra";
import { fileURLToPath } from 'url';


export function buildAST(fileURI: string, fileContents: string): metaData[] {
  let inputStream = new CharStream(fileContents);
  let lexer = new pss_lexer(inputStream);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new pss(tokenStream);
  parser.removeErrorListeners(); /* No need for error listener for now */
  /*parser.addErrorListener(new PSSErrorListener())*/
  let tree = parser.pss_entry();
  let myVisitor = new visitor(tokenStream, fileURI);
  tree.accept(myVisitor);
  return [...new Set(myVisitor.getMeta())];
}

export function buildASTNew(fileURI: string, fileContents: string): PSSLangObjects[] {
  let inputStream = new CharStream(fileContents);
  let lexer = new pss_lexer(inputStream);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new pss(tokenStream);
  let myVisitor = new advancedVisitor(tokenStream, fileURI);

  parser.removeErrorListeners(); /* No need for error listener for now */
  /*parser.addErrorListener(new PSSErrorListener())*/
  let errStrategy: ErrorStrategy = new BailErrorStrategy();
  try {
    parser._interp.predictionMode = PredictionMode.SLL;
    errStrategy = parser._errHandler;
    parser._errHandler = new BailErrorStrategy();
    parser.pss_entry().accept(myVisitor);
  } catch (e) {
    try {
      parser._interp.predictionMode = PredictionMode.LL;
      parser._errHandler = errStrategy;
      parser.pss_entry().accept(myVisitor);
    } catch (e) {
      // console.warn("Parsing failed for file: ", fileURI.substring(fileURI.lastIndexOf("/") + 1));
      // const msg = e as Error;
      // console.warn(msg.message);
      return [];
    }
    // console.warn("Parsing failed for file: ", fileURI.substring(fileURI.lastIndexOf("/") + 1));
    // const msg = e as Error;
    // console.warn(msg.message);
  }
  const res = myVisitor.getAstObjects();
  // writeFileSync(fileURLToPath(fileURI) + '-lsp.json', JSON.stringify(res, null, 4), 'utf-8');
  return res;
}