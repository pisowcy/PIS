from django.test import TestCase
from Website.models import Teacher


class AnimalTestCase(TestCase):
    def setUp(self):
        Teacher.objects.create(name="Arnold Boczek", age=30)
        Teacher.objects.create(name="Ferdynand Kiepski", age=35)

    def test_animals_can_speak(self):
        """Animals that can speak are correctly identified"""
        lion = Teacher.objects.get(name="Arnold Boczek")
        cat = Teacher.objects.get(name="Ferdynand Kiepski")
        self.assertEqual(lion.age, 30)
        self.assertEqual(cat.age, 35)