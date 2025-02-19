/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode' {

	// https://github.com/microsoft/vscode/issues/179430

	export interface DocumentDropEdit {
		/**
		 * Identifies the type of edit.
		 *
		 * This id should be unique within the extension but does not need to be unique across extensions.
		 *
		 * TODO: Should this live on the provider instead? That way we could call just the provider we want (however it would
		 * prevent extending providers in the future to allow returning multiple edits)
		 */
		id?: string;

		/**
		 * Human readable label that describes the edit.
		 */
		label?: string;

		/**
		 * The mime type from the {@link DataTransfer} that this edit applies.
		 *
		 * TODO: Should this be taken from `dropMimeTypes` instead?
		 */
		handledMimeType?: string;

		/**
		 * Controls the ordering or multiple paste edits. If this provider yield to edits, it will be shown lower in the list.
		 */
		yieldTo?: ReadonlyArray<
			// TODO: what about built-in providers?
			| { readonly extensionId: string; readonly editId: string }
			| { readonly mimeType: string }
		>;
	}

	export interface DocumentDropEditProviderMetadata {
		/**
		 * List of data transfer types that the provider supports.
		 *
		 * This can either be an exact mime type such as `image/png`, or a wildcard pattern such as `image/*`.
		 *
		 * Use `text/uri-list` for resources dropped from the explorer or other tree views in the workbench.
		 *
		 * Use `files` to indicate that the provider should be invoked if any {@link DataTransferFile files} are present in the {@link DataTransfer}.
		 * Note that {@link DataTransferFile} entries are only created when dropping content from outside the editor, such as
		 * from the operating system.
		 */
		readonly dropMimeTypes: readonly string[];
	}

	export namespace languages {
		export function registerDocumentDropEditProvider(selector: DocumentSelector, provider: DocumentDropEditProvider, metadata?: DocumentDropEditProviderMetadata): Disposable;
	}
}
