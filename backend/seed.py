from apps.courses.models import Course

Course.objects.create(title='ChatGPT Prompt Engineering', platform='DeepLearning.AI', url='https://deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', description='Aprendé a usar la API de ChatGPT para construir aplicaciones.', language='en', level='beginner', category='use_ai')
Course.objects.create(title='Intro to Machine Learning', platform='Kaggle Learn', url='https://kaggle.com/learn/intro-to-machine-learning', description='Conceptos básicos de ML con ejemplos prácticos en Python.', language='en', level='beginner', category='ml_fundamentals')

print(f'Cursos creados: {Course.objects.count()}')
