from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Submission


class SubmissionCreateTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('submission-create')
        self.payload = {
            'title': 'Curso de Python',
            'platform': 'YouTube',
            'url': 'https://youtube.com/python',
            'description': 'Aprende Python desde cero',
            'language': 'es',
            'level': 'beginner',
            'category': 'code_with_ai',
        }

    def test_crear_submission_sin_autenticacion(self):
        res = self.client.post(self.url, self.payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Submission.objects.count(), 1)

    def test_submission_source_es_community(self):
        self.client.post(self.url, self.payload)
        self.assertEqual(Submission.objects.first().source, 'community')

    def test_submission_estado_inicial_es_pending(self):
        self.client.post(self.url, self.payload)
        self.assertEqual(Submission.objects.first().status, 'pending')

    def test_submission_campos_requeridos(self):
        res = self.client.post(self.url, {'title': 'Incompleto'})
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
