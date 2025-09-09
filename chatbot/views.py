from django.http import JsonResponse

qa_pairs = {
    "hi": "Hello! How can I help you?",
    "hello": "Hey there! 😊",
    "how are you": "I'm doing great! How about you?",
    "bye": "Goodbye! Take care! 👋",
    "what is your name": "I'm your friendly chatbot 🤖",
}


def chatbot_response(request):
    question = request.GET.get("q", "").lower().strip()
    answer = qa_pairs.get(question, "Sorry 😅, I don’t understand that yet.")
    return JsonResponse({"answer": answer})
