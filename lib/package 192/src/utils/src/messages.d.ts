/**
 * Re-export this helper function so that users of `@angular/localize` don't need to actively import
 * from `@angular/compiler`.
 */
export { computeMsgId } from '@angular/compiler';
/**
 * A string containing a translation source message.
 *
 * I.E. the message that indicates what will be translated from.
 *
 * Uses `{$placeholder-name}` to indicate a placeholder.
 */
export declare type SourceMessage = string;
/**
 * A string containing a translation target message.
 *
 * I.E. the message that indicates what will be translated to.
 *
 * Uses `{$placeholder-name}` to indicate a placeholder.
 */
export declare type TargetMessage = string;
/**
 * A string that uniquely identifies a message, to be used for matching translations.
 */
export declare type MessageId = string;
/**
 * Declares a copy of the `AbsoluteFsPath` branded type in `@angular/compiler-cli` to avoid an
 * import into `@angular/compiler-cli`. The compiler-cli's declaration files are not necessarily
 * compatible with web environments that use `@angular/localize`, and would inadvertently include
 * `typescript` declaration files in any compilation unit that uses `@angular/localize` (which
 * increases parsing time and memory usage during builds) using a default import that only
 * type-checks when `allowSyntheticDefaultImports` is enabled.
 *
 * @see https://github.com/angular/angular/issues/45179
 */
declare type AbsoluteFsPathLocalizeCopy = string & {
    _brand: 'AbsoluteFsPath';
};
/**
 * The location of the message in the source file.
 *
 * The `line` and `column` values for the `start` and `end` properties are zero-based.
 */
export interface SourceLocation {
    start: {
        line: number;
        column: number;
    };
    end: {
        line: number;
        column: number;
    };
    file: AbsoluteFsPathLocalizeCopy;
    text?: string;
}
/**
 * Additional information that can be associated with a message.
 */
export interface MessageMetadata {
    /**
     * A human readable rendering of the message
     */
    text: string;
    /**
     * Legacy message ids, if provided.
     *
     * In legacy message formats the message id can only be computed directly from the original
     * template source.
     *
     * Since this information is not available in `$localize` calls, the legacy message ids may be
     * attached by the compiler to the `$localize` metablock so it can be used if needed at the point
     * of translation if the translations are encoded using the legacy message id.
     */
    legacyIds?: string[];
    /**
     * The id of the `message` if a custom one was specified explicitly.
     *
     * This id overrides any computed or legacy ids.
     */
    customId?: string;
    /**
     * The meaning of the `message`, used to distinguish identical `messageString`s.
     */
    meaning?: string;
    /**
     * The description of the `message`, used to aid translation.
     */
    description?: string;
    /**
     * The location of the message in the source.
     */
    location?: SourceLocation;
}
/**
 * Information parsed from a `$localize` tagged string that is used to translate it.
 *
 * For example:
 *
 * ```
 * const name = 'Jo Bloggs';
 * $localize`Hello ${name}:title@@ID:!`;
 * ```
 *
 * May be parsed into:
 *
 * ```
 * {
 *   id: '6998194507597730591',
 *   substitutions: { title: 'Jo Bloggs' },
 *   messageString: 'Hello {$title}!',
 *   placeholderNames: ['title'],
 *   associatedMessageIds: { title: 'ID' },
 * }
 * ```
 */
export interface ParsedMessage extends MessageMetadata {
    /**
     * The key used to look up the appropriate translation target.
     */
    id: MessageId;
    /**
     * A mapping of placeholder names to substitution values.
     */
    substitutions: Record<string, any>;
    /**
     * An optional mapping of placeholder names to associated MessageIds.
     * This can be used to match ICU placeholders to the message that contains the ICU.
     */
    associatedMessageIds?: Record<string, MessageId>;
    /**
     * An optional mapping of placeholder names to source locations
     */
    substitutionLocations?: Record<string, SourceLocation | undefined>;
    /**
     * The static parts of the message.
     */
    messageParts: string[];
    /**
     * An optional mapping of message parts to source locations
     */
    messagePartLocations?: (SourceLocation | undefined)[];
    /**
     * The names of the placeholders that will be replaced with substitutions.
     */
    placeholderNames: string[];
}
/**
 * Parse a `$localize` tagged string into a structure that can be used for translation or
 * extraction.
 *
 * See `ParsedMessage` for an example.
 */
export declare function parseMessage(messageParts: TemplateStringsArray, expressions?: readonly any[], location?: SourceLocation, messagePartLocations?: (SourceLocation | undefined)[], expressionLocations?: (SourceLocation | undefined)[]): ParsedMessage;
/**
 * Parse the given message part (`cooked` + `raw`) to extract the message metadata from the text.
 *
 * If the message part has a metadata block this function will extract the `meaning`,
 * `description`, `customId` and `legacyId` (if provided) from the block. These metadata properties
 * are serialized in the string delimited by `|`, `@@` and `␟` respectively.
 *
 * (Note that `␟` is the `LEGACY_ID_INDICATOR` - see `constants.ts`.)
 *
 * For example:
 *
 * ```ts
 * `:meaning|description@@custom-id:`
 * `:meaning|@@custom-id:`
 * `:meaning|description:`
 * `:description@@custom-id:`
 * `:meaning|:`
 * `:description:`
 * `:@@custom-id:`
 * `:meaning|description@@custom-id␟legacy-id-1␟legacy-id-2:`
 * ```
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns A object containing any metadata that was parsed from the message part.
 */
export declare function parseMetadata(cooked: string, raw: string): MessageMetadata;
/**
 * Parse the given message part (`cooked` + `raw`) to extract any placeholder metadata from the
 * text.
 *
 * If the message part has a metadata block this function will extract the `placeholderName` and
 * `associatedMessageId` (if provided) from the block.
 *
 * These metadata properties are serialized in the string delimited by `@@`.
 *
 * For example:
 *
 * ```ts
 * `:placeholder-name@@associated-id:`
 * ```
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns A object containing the metadata (`placeholderName` and `associatedMesssageId`) of the
 *     preceding placeholder, along with the static text that follows.
 */
export declare function parsePlaceholder(cooked: string, raw: string): {
    messagePart: string;
    placeholderName?: string;
    associatedMessageId?: string;
};
/**
 * Split a message part (`cooked` + `raw`) into an optional delimited "block" off the front and the
 * rest of the text of the message part.
 *
 * Blocks appear at the start of message parts. They are delimited by a colon `:` character at the
 * start and end of the block.
 *
 * If the block is in the first message part then it will be metadata about the whole message:
 * meaning, description, id.  Otherwise it will be metadata about the immediately preceding
 * substitution: placeholder name.
 *
 * Since blocks are optional, it is possible that the content of a message block actually starts
 * with a block marker. In this case the marker must be escaped `\:`.
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns An object containing the `text` of the message part and the text of the `block`, if it
 * exists.
 * @throws an error if the `block` is unterminated
 */
export declare function splitBlock(cooked: string, raw: string): {
    text: string;
    block?: string;
};
/**
 * Find the end of a "marked block" indicated by the first non-escaped colon.
 *
 * @param cooked The cooked string (where escaped chars have been processed)
 * @param raw The raw string (where escape sequences are still in place)
 *
 * @returns the index of the end of block marker
 * @throws an error if the block is unterminated
 */
export declare function findEndOfBlock(cooked: string, raw: string): number;
