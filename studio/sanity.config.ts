import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'wanderwithakhi-studio',

  // TODO: Replace with your actual project ID from manage.sanity.io
  projectId: 'your_project_id',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
