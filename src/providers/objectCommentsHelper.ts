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

import { AssignmentNode, CompNode, FunctionCallNode, FunctionNode, InstanceNode, PSSLangObjects, RegisterCompNode, RegisterDefNode, RegisterGroupNode } from "../definitions/dataStructures";
import { objType, params } from "../definitions/dataTypes";

/**
 * Generates a Doxygen-style comment for a component node.
 * @param node The component node
 * @returns The formatted comment string
 */
function generateComponentComment(node: CompNode): string {
  let comment = `/**\n * @brief Component: ${node.name || 'Unnamed'}\n`;
  if (node.isPure) {
    comment += ` * This is a pure component.\n`;
  }
  if (node.templateParams && node.templateParams.length > 0) {
    comment += ` * Template Parameters:\n`;
    node.templateParams.forEach((param: params) => {
      comment += ` * @param ${param.paramType} ${param.paramName}`;
      if (param.paramDefault) {
        comment += ` = ${param.paramDefault}`;
      }
      comment += `\n`;
    });
  }
  if (node.superSpec) {
    comment += ` * Extends: ${node.superSpec}\n`;
  }
  comment += ` */`;
  return comment;
}

/**
 * Generates a regular comment for an instance node.
 * @param node The instance node
 * @returns The formatted comment string
 */
function generateInstanceComment(node: InstanceNode): string {
  let comment = `// Instance of ${node.instanceType || 'unknown type'}: ${node.name || 'Unnamed'}`;
  if (node.instanceArrayCount) {
    comment += ` [${node.instanceArrayCount}]`;
  }
  if (node.isRandom) {
    comment += ` (random)`;
  }
  if (node.isStaticConst) {
    comment += ` (static const)`;
  }
  if (node.accessModifier) {
    comment += ` (${node.accessModifier})`;
  }
  if (node.instanceDefaultValue) {
    comment += ` = ${node.instanceDefaultValue}`;
  }
  return comment;
}

/**
 * Generates a regular comment for an assignment node.
 * @param node The assignment node
 * @returns The formatted comment string
 */
function generateAssignmentComment(node: AssignmentNode): string {
  let comment = `// Assignment: ${node.name} ${node.operation || 'unknown operation'} ${node.value || 'unknown value'} `;
  if (node.dataType) {
    comment += ` (type: ${node.dataType})`;
  }
  return comment;
}

/**
 * Generates a Doxygen-style comment for a register component node.
 * @param node The register component node
 * @returns The formatted comment string
 */
function generateRegisterCompComment(node: RegisterCompNode): string {
  let comment = `/**\n * @brief Register Component: ${node.name || 'Unnamed'}\n`;
  comment += ` * Access Type: ${node.accessType}\n`;
  comment += ` * Register Length: ${node.registerLength}\n`;
  if (node.basedOnStruct) {
    comment += ` * Based on Struct: ${node.basedOnStruct}\n`;
  }
  comment += ` */`;
  return comment;
}

/**
 * Generates a Doxygen-style comment for a register group node.
 * @param node The register group node
 * @returns The formatted comment string
 */
function generateRegisterGroupComment(node: RegisterGroupNode): string {
  let comment = `/**\n * @brief Register Group: ${node.name || 'Unnamed'}\n`;
  if (node.baseAddress) {
    comment += ` * Base Address: ${node.baseAddress}\n`;
  }
  comment += ` */`;
  return comment;
}

/**
 * Generates a Doxygen-style comment for a register definition node.
 * @param node The register definition node
 * @returns The formatted comment string
 */
function generateRegisterDefComment(node: RegisterDefNode): string {
  let comment = `/**\n * @brief Register Definition: ${node.name || 'Unnamed'}\n`;
  comment += ` * Access Type: ${node.accessType}\n`;
  comment += ` * Register Length: ${node.registerLength}\n`;
  if (node.basedOnStruct) {
    comment += ` * Based on Struct: ${node.basedOnStruct}\n`;
  }
  if (node.instanceArrayCount) {
    comment += ` * Instance Array Count: ${node.instanceArrayCount}\n`;
  }
  comment += ` */`;
  return comment;
}

/**
 * Generates a Doxygen-style comment for a function node.
 * @param node The function node
 * @returns The formatted comment string
 */
function generateFunctionComment(node: FunctionNode): string {
  let comment = `/**\n * @brief Function: ${node.name || 'Unnamed'}\n`;
  if (node.platformQualifier) {
    comment += ` * Platform Qualifier: ${node.platformQualifier}\n`;
  }
  if (node.isPure) {
    comment += ` * This is a pure function.\n`;
  }
  if (node.isStatic) {
    comment += ` * This is a static function.\n`;
  }
  if (node.parameters && node.parameters.length > 0) {
    comment += ` * Parameters:\n`;
    node.parameters.forEach((param: params) => {
      comment += ` * @param ${param.paramType} ${param.paramName}`;
      if (param.paramDefault) {
        comment += ` = ${param.paramDefault}`;
      }
      comment += ` - No description\n`;
    });
  }
  if (node.returnType) {
    comment += ` * @return ${node.returnType}\n`;
  }
  comment += ` */`;
  return comment;
}

/**
 * Generates a default regular comment for unhandled node types.
 * @param node The PSS node
 * @returns The formatted comment string
 */
function generateDefaultComment(node: PSSLangObjects): string {
  return `// ${node.type}: ${node.name || 'Unnamed'}`;
}

/**
 * Generates a Markdown-style comment for a component node.
 * @param node The component node
 * @returns The formatted Markdown comment string
 */
function generateComponentCommentMarkdown(node: CompNode): string {
  let markdown = '### Component:' + node.name + 'n\n';

  if (node.isPure) {
    markdown += `- **Pure**: Yes\n`;
  }
  if (node.superSpec) {
    markdown += `- **Extends**: ${node.superSpec}\n`;
  }
  if (node.templateParams && node.templateParams.length > 0) {
    markdown += '#### Template Parameters\n';
    node.templateParams.forEach((param: params) => {
      let paramStr = `- **${param.paramName}** : ${param.paramType}`;
      if (param.paramDefault) {
        paramStr += ` (default: ${param.paramDefault})`;
      }
      paramStr += '\n';
      markdown += paramStr;
    });
    markdown += "\n";
  }

  return markdown;
}

/**
 * Generates a Markdown-style comment for an instance node.
 * @param node The instance node
 * @returns The formatted Markdown comment string
 */
function generateInstanceCommentMarkdown(node: InstanceNode): string {
  let markdown = '### Instance:' + node.name + '\n\n';

  markdown += `- **Type**: ${node.instanceType || 'unknown type'}\n`;
  if (node.instanceArrayCount) {
    markdown += `- **Array Count**: ${node.instanceArrayCount}\n`;
  }
  if (node.isRandom) {
    markdown += `- **Random**: Yes\n`;
  }
  if (node.isStaticConst) {
    markdown += `- **Static Const**: Yes\n`;
  }
  if (node.accessModifier) {
    markdown += `- **Access Modifier**: ${node.accessModifier}\n`;
  }
  if (node.instanceDefaultValue) {
    markdown += `- **Default Value**: ${node.instanceDefaultValue}\n`;
  }

  return markdown;
}

/**
 * Generates a Markdown-style comment for an assignment node.
 * @param node The assignment node
 * @returns The formatted Markdown comment string
 */
function generateAssignmentCommentMarkdown(node: AssignmentNode): string {
  let markdown = '### Assignment:' + node.name + '\n\n';

  markdown += `- **Operation**: ${node.operation || 'unknown operation'}\n`;
  markdown += `- **Value**: ${node.value || 'unknown value'}\n`;
  if (node.dataType) {
    markdown += `- **Data Type**: ${node.dataType}\n`;
  }

  return markdown;
}

/**
 * Generates a Markdown-style comment for a register component node.
 * @param node The register component node
 * @returns The formatted Markdown comment string
 */
function generateRegisterCompCommentMarkdown(node: RegisterCompNode): string {
  let markdown = '### Register Component:' + node.name + `\n\n`;

  markdown += `- **Access Type**: ${node.accessType}\n`;
  markdown += `- **Register Length**: ${node.registerLength}\n`;
  if (node.basedOnStruct) {
    markdown += `- **Based on Struct**: ${node.basedOnStruct}\n`;
  }

  return markdown;
}

/**
 * Generates a Markdown-style comment for a register group node.
 * @param node The register group node
 * @returns The formatted Markdown comment string
 */
function generateRegisterGroupCommentMarkdown(node: RegisterGroupNode): string {
  let markdown = '### Register Group:' + node.name + '\n\n';

  if (node.baseAddress) {
    markdown += `- **Base Address**: ${node.baseAddress}\n`;
  }

  return markdown;
}

/**
 * Generates a Markdown-style comment for a register definition node.
 * @param node The register definition node
 * @returns The formatted Markdown comment string
 */
function generateRegisterDefCommentMarkdown(node: RegisterDefNode): string {
  let markdown = '### Register Definition:' + node.name + '\n\n';

  markdown += `- **Access Type**: ${node.accessType}\n`;
  markdown += `- **Register Length**: ${node.registerLength}\n`;
  if (node.basedOnStruct) {
    markdown += `- **Based on Struct**: ${node.basedOnStruct}\n`;
  }
  if (node.instanceArrayCount) {
    markdown += `- **Instance Array Count**: ${node.instanceArrayCount}\n`;
  }

  return markdown;
}

/**
 * Generates a Markdown-style comment for a function node.
 * @param node The function node
 * @returns The formatted Markdown comment string
 */
function generateFunctionCommentMarkdown(node: FunctionNode): string {
  let markdown = '### Function: ' + node.name + '\n\n';

  if (node.platformQualifier) {
    markdown += `- **Platform Qualifier**: **${node.platformQualifier}**\n`;
  }
  if (node.isPure) {
    markdown += `- **Pure**: Yes\n`;
  }
  if (node.isStatic) {
    markdown += `- **Static**: Yes\n`;
  }
  if (node.parameters && node.parameters.length > 0) {
    markdown += '#### Parameters\n';
    node.parameters.forEach((param: params) => {
      let paramStr = `- **${param.paramName}** : ${param.paramType}`;
      if (param.paramDefault) {
        paramStr += ` (default: ${param.paramDefault})`;
      }
      paramStr += '\n';
      markdown += paramStr;
    });
    markdown += "\n";
  }
  if (node.returnType) {
    markdown += '#### Returns\n' + node.returnType + '\n\n';
  }

  return markdown;
}


/**
 * Generates a Markdown-style comment for a function call node.
 * @param node The function all node
 * @returns The formatted Markdown comment string
 */
function generateFunctionCallCommentMarkdown(node: FunctionCallNode, depth: number = 0): string {
  let markdown: string = (depth === 0) ? '### ' : '';
  markdown += ' '.repeat(depth * 2) + 'Function Call: ' + node.name + '\n\n';
  if (node.super) {
    markdown += ' '.repeat(depth * 2) + `- **Called using super**: Yes\n`;
  }
  if (node.refPath && node.refPath !== node.name) {
    markdown += ' '.repeat(depth * 2) + `- **Ref-path**: ${node.refPath}\n`;
  }
  if (node.children.length > 0) {
    markdown += ' '.repeat(depth * 2) + 'Parameters: \n'
    node.children.forEach(child => {
      if (child.type === objType.FUNCTION_CALL) {
        markdown += generateFunctionCallCommentMarkdown(child as FunctionCallNode, depth + 1);
      } else {
        const childItem = child as AssignmentNode;
        markdown += ' '.repeat(depth * 2) + `   * ${childItem.value}\n`;
      }
    });
  }

  return markdown;
}

/**
 * Generates a default Markdown-style comment for unhandled node types.
 * @param node The PSS node
 * @returns The formatted Markdown comment string
 */
function generateDefaultCommentMarkdown(node: PSSLangObjects): string {
  return `#### ${node.type}: ${node.name || 'Unnamed'}\n\n`;
}

export {
  generateComponentComment,
  generateInstanceComment,
  generateAssignmentComment,
  generateRegisterCompComment,
  generateRegisterGroupComment,
  generateRegisterDefComment,
  generateFunctionComment,
  generateDefaultComment,
  generateComponentCommentMarkdown,
  generateInstanceCommentMarkdown,
  generateAssignmentCommentMarkdown,
  generateRegisterCompCommentMarkdown,
  generateRegisterGroupCommentMarkdown,
  generateRegisterDefCommentMarkdown,
  generateFunctionCommentMarkdown,
  generateDefaultCommentMarkdown,
  generateFunctionCallCommentMarkdown
};