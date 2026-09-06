import { query } from '@anthropic-ai/claude-agent-sdk';
import { getAssistantResponse, getAllAssistantMessages } from './main';

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
  gray: '\x1b[90m',
};

function colorize(text: string, color: string): string {
  return `${color}${text}${colors.reset}`;
}

export async function displayRealOutput(): Promise<void> {
  console.log('\n' + colorize('═'.repeat(70), colors.cyan));
  console.log(
    colorize('  Claude Assistant Query Adapter - Real API Demo', colors.cyan + colors.bright),
  );
  console.log(colorize('═'.repeat(70), colors.cyan) + '\n');

  // Send a real query to Claude
  console.log(colorize('🚀 Sending query to Claude API...', colors.blue + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  Prompt:', colors.yellow) +
      ' "JavaScriptの配列メソッドを3つ説明してください。簡潔に。"',
  );
  console.log('');

  const queryResult = query({
    prompt: 'JavaScriptの配列メソッドを3つ説明してください。簡潔に。',
  });

  // Example 1: getAssistantResponse
  console.log(colorize('📌 Getting Last Assistant Message', colors.blue + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));

  const lastResponse = await getAssistantResponse(queryResult);
  console.log(colorize('  Result:', colors.green + colors.bright));
  console.log('');
  if (lastResponse) {
    console.log(colorize('    ' + lastResponse, colors.green));
  } else {
    console.log(colorize('    (No assistant message found)', colors.gray));
  }
  console.log('');
  console.log('');

  // Example 2: getAllAssistantMessages
  const queryResult2 = query({
    prompt: 'JavaScriptの配列メソッドを3つ説明してください。簡潔に。',
  });

  console.log(colorize('📌 Getting All Assistant Messages', colors.blue + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));

  const allMessages = await getAllAssistantMessages(queryResult2);
  console.log(colorize('  Result:', colors.green + colors.bright));
  console.log('');

  if (allMessages.length > 0) {
    allMessages.forEach((msg, index) => {
      console.log(colorize(`    [${index + 1}]`, colors.magenta + colors.bright));
      console.log(colorize(`       ${msg}`, colors.green));
      if (index < allMessages.length - 1) {
        console.log('');
      }
    });
  } else {
    console.log(colorize('    (No assistant messages found)', colors.gray));
  }
  console.log('');
  console.log('');

  // Summary
  console.log(colorize('📊 Summary:', colors.blue + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  • Total assistant messages:', colors.yellow) +
      colorize(` ${allMessages.length}`, colors.green + colors.bright),
  );
  if (lastResponse) {
    console.log(
      colorize('  • Last message length:', colors.yellow) +
        colorize(` ${lastResponse.length} characters`, colors.green + colors.bright),
    );
  }
  console.log(colorize('  • Status:', colors.yellow) + colorize(' ✓ Success', colors.green));
  console.log('');
  console.log(colorize('═'.repeat(70), colors.cyan));
  console.log('');
}

// Run if this file is executed directly
if (require.main === module) {
  displayRealOutput().catch((error) => {
    console.error(
      colorize('❌ Error:', colors.red + colors.bright),
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  });
}
