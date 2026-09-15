import unittest
from sync_learning_catalog import build_catalog
class CatalogTests(unittest.TestCase):
 def test_dates_hierarchy_and_incomplete_program(self):
  files=[{'path':'Issuer/Program/README.md','text':'# Program'}, {'path':'Issuer/Program/Course/README.md','text':'# Course\n\nDescription\n\n**Completion Date:** March 29, 2026'}, {'path':'Issuer/Program/Course/Module 1 - Python.md','text':'# Module 1\n\n## Topics\n\n- Python tools'}, {'path':'Issuer/Program/Planned/README.md','text':'# Planned\n\n**Completion Date:** March 30, 2026'}]
  data=build_catalog('a'*40,files,[{'path':'Issuer/Program/Course/proof.pdf','credential':'https://example.com/proof'}]); e={e['title']:e for e in data['entries']}
  self.assertEqual(e['Course']['completedAt'],'2026-03-29');self.assertEqual(e['Course']['parentId'],'Issuer/Program');self.assertEqual(e['Course']['modules'][0]['topics'],['Python tools']);self.assertIsNone(e['Planned']['completedAt']);self.assertNotEqual(e['Program']['status'],'completed')
