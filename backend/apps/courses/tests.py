from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Course


def make_course(**kwargs):
    defaults = dict(
        title='Intro a ML',
        platform='Kaggle',
        url='https://kaggle.com/intro-ml',
        description='Curso de ML para principiantes',
        language='es',
        level='beginner',
        category='ml_fundamentals',
        is_active=True,
    )
    defaults.update(kwargs)
    return Course.objects.create(**defaults)


class CourseListTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('course-list')
        self.course = make_course()

    def test_lista_cursos_activos(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), 1)

    def test_cursos_inactivos_no_aparecen(self):
        make_course(title='Oculto', url='https://example.com/oculto', is_active=False)
        res = self.client.get(self.url)
        self.assertEqual(len(res.data['results']), 1)

    def test_filtro_por_idioma(self):
        make_course(title='English course', url='https://example.com/en', language='en')
        res = self.client.get(self.url, {'language': 'en'})
        self.assertEqual(len(res.data['results']), 1)
        self.assertEqual(res.data['results'][0]['language'], 'en')

    def test_filtro_por_nivel(self):
        make_course(title='Avanzado', url='https://example.com/adv', level='advanced')
        res = self.client.get(self.url, {'level': 'beginner'})
        self.assertEqual(len(res.data['results']), 1)

    def test_filtro_por_categoria(self):
        make_course(title='Deep Learning', url='https://example.com/dl', category='deep_learning')
        res = self.client.get(self.url, {'category': 'ml_fundamentals'})
        self.assertEqual(len(res.data['results']), 1)

    def test_busqueda_por_titulo(self):
        res = self.client.get(self.url, {'search': 'Intro'})
        self.assertEqual(len(res.data['results']), 1)

    def test_busqueda_sin_resultados(self):
        res = self.client.get(self.url, {'search': 'zzznoresults'})
        self.assertEqual(len(res.data['results']), 0)


class CourseDetailTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course = make_course()

    def test_detalle_curso(self):
        url = reverse('course-detail', args=[self.course.id])
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['title'], self.course.title)

    def test_curso_inexistente_retorna_404(self):
        url = reverse('course-detail', args=[9999])
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class CourseFiltersEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_retorna_filtros_disponibles(self):
        url = reverse('course-filters')
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('languages', res.data)
        self.assertIn('levels', res.data)
        self.assertIn('categories', res.data)
