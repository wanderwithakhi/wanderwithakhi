import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    // TODO: Replace with your actual project ID from manage.sanity.io
    projectId: 'your_project_id',
    dataset: 'production'
  }
});
