import { getAssistantResponse, getAllAssistantMessages } from './main';
import type { Query, SDKMessage } from '@anthropic-ai/claude-agent-sdk';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m',
};

function colorize(text: string, color: string): string {
  return `${color}${text}${colors.reset}`;
}

async function createSampleQuery(): Promise<Query> {
  const messages: SDKMessage[] = [
    {
      type: 'user',
      message: { content: [{ type: 'text', text: 'Hello, how can I use this adapter?' }] },
    } as any,
    {
      type: 'assistant',
      message: {
        content: [
          {
            type: 'text',
            text: 'You can use this adapter to extract assistant messages from a query stream.',
          },
        ],
      },
    } as any,
    {
      type: 'user',
      message: { content: [{ type: 'text', text: 'Can you show me an example?' }] },
    } as any,
    {
      type: 'assistant',
      message: {
        content: [
          {
            type: 'text',
            text: 'Sure! You can use getAssistantResponse() to get the last message, or getAllAssistantMessages() to get all of them.',
          },
        ],
      },
    } as any,
    {
      type: 'assistant',
      message: {
        content: [
          {
            type: 'text',
            text: 'Both functions handle text extraction and filtering automatically.',
          },
        ],
      },
    } as any,
  ];

  return {
    async *[Symbol.asyncIterator]() {
      for (const message of messages) {
        yield message;
      }
    },
  } as unknown as Query;
}

export async function displaySampleOutput(): Promise<void> {
  console.log('\n' + colorize('═'.repeat(70), colors.cyan));
  console.log(
    colorize('  Assistant Query Adapter - Sample Output', colors.cyan + colors.bright),
  );
  console.log(colorize('═'.repeat(70), colors.cyan) + '\n');

  // Sample conversation data
  console.log(colorize('📋 Sample Conversation Data:', colors.blue + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  • User message 1:', colors.yellow) +
      ' "Hello, how can I use this adapter?"',
  );
  console.log(
    colorize('  • Assistant message 1:', colors.green) +
      ' "You can use this adapter to extract..."',
  );
  console.log(
    colorize('  • User message 2:', colors.yellow) +
      ' "Can you show me an example?"',
  );
  console.log(
    colorize('  • Assistant message 2:', colors.green) +
      ' "Sure! You can use getAssistantResponse()..."',
  );
  console.log(
    colorize('  • Assistant message 3:', colors.green) +
      ' "Both functions handle text extraction..."',
  );
  console.log('');

  const query = await createSampleQuery();

  // Example 1: getAssistantResponse
  console.log(colorize('📌 Example 1: getAssistantResponse()', colors.blue + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  Description: ', colors.yellow) +
      'Returns the text of the LAST assistant message',
  );
  console.log('');

  const lastResponse = await getAssistantResponse(query);
  console.log(colorize('  Result:', colors.green + colors.bright));
  console.log('');
  console.log(
    colorize(
      '    ' + (lastResponse || 'null'),
      colors.green,
    ),
  );
  console.log('');
  console.log('');

  // Example 2: getAllAssistantMessages
  const query2 = await createSampleQuery();
  console.log(
    colorize('📌 Example 2: getAllAssistantMessages()', colors.blue + colors.bright),
  );
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  Description: ', colors.yellow) +
      'Returns an array of ALL assistant messages',
  );
  console.log('');

  const allMessages = await getAllAssistantMessages(query2);
  console.log(colorize('  Result:', colors.green + colors.bright));
  console.log('');

  allMessages.forEach((msg, index) => {
    console.log(colorize(`    [${index + 1}]`, colors.magenta + colors.bright) + ` ${msg}`);
  });
  console.log('');
  console.log('');

  // Summary
  console.log(colorize('📊 Summary:', colors.blue + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  • Total messages in conversation:', colors.yellow) +
      ' 5 (2 user, 3 assistant)',
  );
  console.log(
    colorize('  • Assistant messages found:', colors.green) +
      colorize(` ${allMessages.length}`, colors.green + colors.bright),
  );
  console.log(
    colorize('  • Last assistant message:', colors.green) +
      colorize(` "${lastResponse?.substring(0, 50)}..."`, colors.green + colors.bright),
  );
  console.log('');
  console.log(colorize('═'.repeat(70), colors.cyan));
  console.log('');
}

// Run the sample if this file is executed directly
if (require.main === module) {
  displaySampleOutput().catch((error) => {
    console.error(colorize('Error:', colors.red + colors.bright), error);
    process.exit(1);
  });
}
