/**
 * validate هي دالة "factory" بتاخد Joi schema وترجع middleware جاهزة
 * كل عضو في التيم هيستخدمها كده في الـ routes بتاعته:
 *
 *   const { registerSchema } = require('../validations/auth.validation');
 *   router.post('/register', validate(registerSchema), authController.register);
 *
 * لو عايز تتحقق من params أو query بدل الـ body:
 *   router.get('/:id', validate(idParamSchema, 'params'), controller.getOne);
 *
 * @param {Joi.Schema} schema - الـ Joi schema اللي هيتحقق بيه
 * @param {'body'|'params'|'query'} source - مصدر البيانات المراد التحقق منها (افتراضي: body)
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], {
      abortEarly: false, 
      stripUnknown: true, 
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message.replace(/"/g, ''));
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors,
      });
    }

    next();
  };
};

module.exports = validate;
