import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    // Sanity project ID from manage.sanity.io
    projectId: 'y729p0ml',
    dataset: 'production'
  }
});
