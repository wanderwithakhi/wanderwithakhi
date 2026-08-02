import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'wanderwithakhi-studio',

  // Sanity project ID from manage.sanity.io
  projectId: 'y729p0ml',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
