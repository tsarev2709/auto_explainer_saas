const { z } = require('zod');

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  format: z.enum(['16:9', '9:16', '1:1']).optional(),
  target_audience: z.string().optional(),
  goals: z.string().optional(),
  tone: z.string().optional(),
  style: z.string().optional(),
});

function validateProject(req, res, next) {
  try {
    req.validatedBody = projectSchema.parse(req.body);
    next();
  } catch (err) {
    const message = err.errors && err.errors.length ? err.errors[0].message : 'Validation error';
    res.status(400).json({ error: message });
  }
}

module.exports = { validateProject };
