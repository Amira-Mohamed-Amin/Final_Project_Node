const AppError = require('../utils/AppError');

/**
 * restrictTo بتتحقق إن req.user.role موجود ضمن الأدوار المسموح لها
 * لازم تتحط بعد auth.middleware (عشان محتاجة req.user موجودة الأول)
 *
 * مثال استخدام:
 *   router.delete('/:id', authMiddleware, restrictTo('admin'), userController.deleteUser);
 *
 * @param  {...string} roles - الأدوار المسموح لها بالدخول، مثلاً: 'admin', 'user'
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('You must be logged in to access this resource', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

module.exports = restrictTo;
