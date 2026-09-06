import { query } from '@anthropic-ai/claude-agent-sdk';
import { getAssistantResponse, getAllAssistantMessages } from './main';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

// Assistant message colors - blue tones (similar/related colors)
const assistantColors = [
  '\x1b[34m',         // blue
  '\x1b[38;5;33m',    // dark slate blue
  '\x1b[38;5;39m',    // bright blue
  '\x1b[38;5;27m',    // deep blue
];

// Result color - orange (not in assistant palette)
const resultColor = '\x1b[38;5;214m';

// Header color for section titles
const sectionTitleColor = '\x1b[38;5;46m'; // bright green (distinct from assistant blues)

function colorize(text: string, color: string): string {
  return `${color}${text}${colors.reset}`;
}

function getAssistantColor(index: number): string {
  return assistantColors[index % assistantColors.length];
}

export async function displayRealOutput(): Promise<void> {
  console.log('\n' + colorize('═'.repeat(70), colors.cyan));
  console.log(
    colorize('  Claude Assistant Query Adapter - Real API Demo', colors.cyan + colors.bright),
  );
  console.log(colorize('═'.repeat(70), colors.cyan) + '\n');

  // Send a real query to Claude
  console.log(colorize('🚀 Sending query to Claude API...', sectionTitleColor + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  Prompt:', resultColor) +
      ' "JavaScriptの配列メソッドを3つ説明してください。簡潔に。"',
  );
  console.log('');

  const queryResult = query({
    prompt: 'JavaScriptの配列メソッドを3つ説明してください。簡潔に。',
  });

  // Example 1: getAssistantResponse
  console.log(colorize('📌 Getting Last Assistant Message', sectionTitleColor + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));

  const lastResponse = await getAssistantResponse(queryResult);
  console.log(colorize('  Result:', resultColor + colors.bright));
  console.log('');
  if (lastResponse) {
    const assistantColor = getAssistantColor(0);
    console.log(colorize('    ' + lastResponse, assistantColor));
  } else {
    console.log(colorize('    (No assistant message found)', colors.gray));
  }
  console.log('');
  console.log('');

  // Example 2: getAllAssistantMessages
  const queryResult2 = query({
    prompt: 'JavaScriptの配列メソッドを3つ説明してください。簡潔に。',
  });

  console.log(colorize('📌 Getting All Assistant Messages', sectionTitleColor + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));

  const allMessages = await getAllAssistantMessages(queryResult2);
  console.log(colorize('  Result:', resultColor + colors.bright));
  console.log('');

  if (allMessages.length > 0) {
    allMessages.forEach((msg, index) => {
      const msgColor = getAssistantColor(index);
      console.log(colorize(`    [${index + 1}]`, msgColor + colors.bright));
      console.log(colorize(`       ${msg}`, msgColor));
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
  console.log(colorize('📊 Summary:', sectionTitleColor + colors.bright));
  console.log(colorize('─'.repeat(70), colors.dim));
  console.log(
    colorize('  • Total assistant messages:', resultColor) +
      colorize(` ${allMessages.length}`, resultColor + colors.bright),
  );
  if (lastResponse) {
    console.log(
      colorize('  • Last message length:', resultColor) +
        colorize(` ${lastResponse.length} characters`, resultColor + colors.bright),
    );
  }
  console.log(colorize('  • Status:', resultColor) + colorize(' ✓ Success', resultColor + colors.bright));
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
