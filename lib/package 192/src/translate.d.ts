import { MessageId, TargetMessage } from './utils';
/**
 * Load translations for use by `$localize`, if doing runtime translation.
 *
 * If the `$localize` tagged strings are not going to be replaced at compiled time, it is possible
 * to load a set of translations that will be applied to the `$localize` tagged strings at runtime,
 * in the browser.
 *
 * Loading a new translation will overwrite a previous translation if it has the same `MessageId`.
 *
 * Note that `$localize` messages are only processed once, when the tagged string is first
 * encountered, and does not provide dynamic language changing without refreshing the browser.
 * Loading new translations later in the application life-cycle will not change the translated text
 * of messages that have already been translated.
 *
 * The message IDs and translations are in the same format as that rendered to "simple JSON"
 * translation files when extracting messages. In particular, placeholders in messages are rendered
 * using the `{$PLACEHOLDER_NAME}` syntax. For example the message from the following template:
 *
 * ```html
 * <div i18n>pre<span>inner-pre<b>bold</b>inner-post</span>post</div>
 * ```
 *
 * would have the following form in the `translations` map:
 *
 * ```ts
 * {
 *   "2932901491976224757":
 *      "pre{$START_TAG_SPAN}inner-pre{$START_BOLD_TEXT}bold{$CLOSE_BOLD_TEXT}inner-post{$CLOSE_TAG_SPAN}post"
 * }
 * ```
 *
 * @param translations A map from message ID to translated message.
 *
 * These messages are processed and added to a lookup based on their `MessageId`.
 *
 * @see `clearTranslations()` for removing translations loaded using this function.
 * @see `$localize` for tagging messages as needing to be translated.
 * @publicApi
 */
export declare function loadTranslations(translations: Record<MessageId, TargetMessage>): void;
/**
 * Remove all translations for `$localize`, if doing runtime translation.
 *
 * All translations that had been loading into memory using `loadTranslations()` will be removed.
 *
 * @see `loadTranslations()` for loading translations at runtime.
 * @see `$localize` for tagging messages as needing to be translated.
 *
 * @publicApi
 */
export declare function clearTranslations(): void;
/**
 * Translate the text of the given message, using the loaded translations.
 *
 * This function may reorder (or remove) substitutions as indicated in the matching translation.
 */
export declare function translate(messageParts: TemplateStringsArray, substitutions: readonly any[]): [
    TemplateStringsArray,
    readonly any[]
];
