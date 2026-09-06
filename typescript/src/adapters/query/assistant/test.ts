import { getAssistantResponse, getAllAssistantMessages } from './main';
import type { Query, SDKMessage } from '@anthropic-ai/claude-agent-sdk';

async function createMockQuery(messages: SDKMessage[]): Promise<Query> {
  return {
    async *[Symbol.asyncIterator]() {
      for (const message of messages) {
        yield message;
      }
    },
  } as unknown as Query;
}

async function runTests() {
  console.log('Running tests for assistant query adapter...\n');

  let passed = 0;
  let failed = 0;

  // Test 1: getAssistantResponse returns last assistant message
  try {
    const mockMessages: SDKMessage[] = [
      {
        type: 'user',
        message: { content: [{ type: 'text', text: 'Hello' }] },
      } as any,
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'First response' }] },
      } as any,
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'Second response' }] },
      } as any,
    ];

    const query = await createMockQuery(mockMessages);
    const result = await getAssistantResponse(query);

    if (result === 'Second response') {
      console.log('✓ Test 1 PASSED: getAssistantResponse returns last assistant message');
      passed++;
    } else {
      console.log(
        `✗ Test 1 FAILED: expected "Second response", got "${result}"`,
      );
      failed++;
    }
  } catch (error) {
    console.log(`✗ Test 1 FAILED: ${error}`);
    failed++;
  }

  // Test 2: getAssistantResponse returns null when no assistant message
  try {
    const mockMessages: SDKMessage[] = [
      {
        type: 'user',
        message: { content: [{ type: 'text', text: 'Hello' }] },
      } as any,
    ];

    const query = await createMockQuery(mockMessages);
    const result = await getAssistantResponse(query);

    if (result === null) {
      console.log('✓ Test 2 PASSED: getAssistantResponse returns null when no assistant message');
      passed++;
    } else {
      console.log(`✗ Test 2 FAILED: expected null, got "${result}"`);
      failed++;
    }
  } catch (error) {
    console.log(`✗ Test 2 FAILED: ${error}`);
    failed++;
  }

  // Test 3: getAllAssistantMessages returns all assistant messages
  try {
    const mockMessages: SDKMessage[] = [
      {
        type: 'user',
        message: { content: [{ type: 'text', text: 'Hello' }] },
      } as any,
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'First response' }] },
      } as any,
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'Second response' }] },
      } as any,
      {
        type: 'user',
        message: { content: [{ type: 'text', text: 'Follow up' }] },
      } as any,
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'Third response' }] },
      } as any,
    ];

    const query = await createMockQuery(mockMessages);
    const results = await getAllAssistantMessages(query);

    if (
      results.length === 3 &&
      results[0] === 'First response' &&
      results[1] === 'Second response' &&
      results[2] === 'Third response'
    ) {
      console.log('✓ Test 3 PASSED: getAllAssistantMessages returns all assistant messages in order');
      passed++;
    } else {
      console.log(`✗ Test 3 FAILED: expected 3 messages, got ${results.length}`);
      failed++;
    }
  } catch (error) {
    console.log(`✗ Test 3 FAILED: ${error}`);
    failed++;
  }

  // Test 4: getAllAssistantMessages returns empty array when no assistant message
  try {
    const mockMessages: SDKMessage[] = [
      {
        type: 'user',
        message: { content: [{ type: 'text', text: 'Hello' }] },
      } as any,
    ];

    const query = await createMockQuery(mockMessages);
    const results = await getAllAssistantMessages(query);

    if (results.length === 0) {
      console.log('✓ Test 4 PASSED: getAllAssistantMessages returns empty array when no assistant message');
      passed++;
    } else {
      console.log(`✗ Test 4 FAILED: expected empty array, got ${results.length} messages`);
      failed++;
    }
  } catch (error) {
    console.log(`✗ Test 4 FAILED: ${error}`);
    failed++;
  }

  // Test 5: getAssistantResponse ignores non-text blocks
  try {
    const mockMessages: SDKMessage[] = [
      {
        type: 'assistant',
        message: { content: [{ type: 'tool_use', id: '123', name: 'test', input: {} }] },
      } as any,
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'Text response' }] },
      } as any,
    ];

    const query = await createMockQuery(mockMessages);
    const result = await getAssistantResponse(query);

    if (result === 'Text response') {
      console.log('✓ Test 5 PASSED: getAssistantResponse ignores non-text blocks');
      passed++;
    } else {
      console.log(`✗ Test 5 FAILED: expected "Text response", got "${result}"`);
      failed++;
    }
  } catch (error) {
    console.log(`✗ Test 5 FAILED: ${error}`);
    failed++;
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});
