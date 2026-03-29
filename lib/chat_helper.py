#!/usr/bin/env python3
"""BugZero Chat Helper - Bridges Node.js with emergentintegrations library for Claude AI"""
import sys
import json
import asyncio
from emergentintegrations.llm.chat import LlmChat, UserMessage

async def main():
    try:
        data = json.loads(sys.stdin.read())
        api_key = data.get('api_key', '')
        session_id = data.get('session_id', 'bugzero-default')
        system_message = data.get('system_message', 'You are a helpful assistant.')
        user_message = data.get('message', '')
        history = data.get('history', [])

        chat = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message=system_message
        )
        chat.with_model("anthropic", "claude-4-sonnet-20250514")

        # Send message and get response
        response = await chat.send_message(UserMessage(text=user_message))
        print(json.dumps({'reply': response, 'success': True}))
    except Exception as e:
        print(json.dumps({'reply': f"I apologize, I'm having a technical issue. Please contact us at contact@bugzero.solutions. Error: {str(e)}", 'success': False, 'error': str(e)}))

if __name__ == '__main__':
    asyncio.run(main())
