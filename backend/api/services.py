from typing import Optional
import google.generativeai as genai
from django.conf import settings

class AIService:
    """Service class to handle interactions with Google's Gemini AI model."""
    
    def __init__(self):
        """Initialize the AI service with Gemini configuration."""
        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(
                model_name="gemini-1.5-pro-002",
                generation_config={
                    "temperature": 0.7,
                    "max_tokens": 1000,
                    "top_p": 0.9,
                }
            )
            self.chat = self.model.start_chat(history=[])
        except Exception as e:
            raise Exception(f"Failed to initialize AI service: {str(e)}")

    def get_response(self, message: str) -> str:
        """
        Get a response from the AI model for a given message.
        
        Args:
            message (str): The user's input message
            
        Returns:
            str: The AI model's response
            
        Raises:
            Exception: If there's an error generating the response
        """
        try:
            response = self.chat.send_message(message)
            return response.text
        except Exception as e:
            return f"Error generating response: {str(e)}"

    def reset_chat(self) -> None:
        """Reset the chat history."""
        self.chat = self.model.start_chat(history=[])