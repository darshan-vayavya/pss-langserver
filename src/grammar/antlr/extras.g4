/* 
 * Copyright (C) 2025 Darshan(@thisisthedarshan)
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with this program. If
 * not, see <https://www.gnu.org/licenses/>.
 */
parser grammar extras;
options {tokenVocab=pssLex;}

import action_declarations,activity_statements,behavioral_coverage,component_declaration,conditional_compilation,constraints,coverage,data_coverage,data_types,exec_blocks,expressions,foreign_procedural_interface,functions,identifiers,numbers_and_literals,overrides,package_declaration,procedural_statements,struct_declaration,template_types,memory,registers;

string_literal :
TOKEN_QUOTED_STRING
| TOKEN_TRIPLE_QUOTED_STRING;

filename_string : TOKEN_QUOTED_STRING;

/* Proper extend statements re-declared */
action_extension
  : (
      (TOKEN_EXTEND TOKEN_ACTION action_identifier) 
    | (TOKEN_EXTEND component_identifier TOKEN_SCOPE action_identifier)
    ) TOKEN_CLBRACE (
		action_body_item*
	) TOKEN_CRBRACE;

/* Comments - to maintain line numbers properly */
comments
  : TOKEN_DOC_COMMENT
  | TOKEN_SL_COMMENT
  | TOKEN_ML_COMMENT
  ;
