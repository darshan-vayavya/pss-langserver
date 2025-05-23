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

// This is a worker thread that runs in the background and updates the data in LSP
import { parentPort, workerData } from 'worker_threads';
import { updateASTNew } from './helpers';
import { PSSLangObjects } from '../definitions/dataStructures';


async function processor(content: string, uri: string): Promise<{
  result: PSSLangObjects[];
  uri: string;
}> {
  const result = await updateASTNew(uri, content);
  return {
    result: result,
    uri: uri
  };
}

(async () => {
  if (!parentPort) {
    console.error("No Parent Port!!");
    return;
  } else {
    const result = await processor(workerData.content, workerData.uri);
    parentPort.postMessage(result);
  }
})();