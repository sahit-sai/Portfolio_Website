import Project from './project.model.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  const { title, description, category, liveUrl, githubUrl, technologies, image } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      image,
      category,
      liveUrl,
      githubUrl,
      tags: technologies ? technologies.split(',').map(tech => tech.trim()) : [],
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  const { title, description, category, liveUrl, githubUrl, technologies, image } = req.body;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.liveUrl = liveUrl || project.liveUrl;
    project.githubUrl = githubUrl || project.githubUrl;
    project.tags = technologies ? technologies.split(',').map(tech => tech.trim()) : project.tags;
    project.image = image || project.image;

    project = await project.save();

    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    await project.deleteOne();

    res.json({ message: 'Project removed' });
  } catch (error) {
    next(error);
  }
};
