/* Numbers the home page shows, computed from the data so they never go stale.
   Add or finish a project in projects.js and the count follows. */
import projects from './projects.js';

export default {
  activeProjects: projects.filter((p) => p.status === 'In progress').length,
};
