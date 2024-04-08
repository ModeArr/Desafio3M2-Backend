const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/config")

const secret = config.JWT_SECRET

const router = Router();

router.get("/logout", (req, res) => {
  res.clearCookie('jwt')
  .status(200)
  .json({
      message: 'You have logged out'
  })
});

router.post("/login", passport.authenticate('login', {
  failureRedirect: '/login',
  failureFlash: true,
  session: false,
}), function(req, res) {
  const token = jwt.sign(JSON.stringify(req.user), secret)
  console.log(req.user)

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    signed: true,
    maxAge: 1000 * 60 * 30 // 30 min
  })

  res.redirect('/');
});

router.post("/register", passport.authenticate('register', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  session: false,
}));

router.get(
  "/github",
  passport.authenticate("github", { 
    scope: ["user:email"]})
);

router.get(
  "/github/callback",
  passport.authenticate("github", { 
    failureRedirect: "/login",
    session: false,
}), function(req, res) {
  const token = jwt.sign(JSON.stringify(req.user), secret)
  console.log(req.user)

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    signed: true,
    maxAge: 1000 * 60 * 60 * 1 // 1 hora
  })

  res.redirect('/');
}
);

router.get("/current", passport.authenticate("jwt", { session: false }),
 function (req, res) {
  if (!req.user) {
    return res.status(401).send({ message: "Acceso denegado. Token inválido o expirado." })
  }
    
  return res.status(200).send({ status: "ok",
              cookieJWT: req.signedCookies['jwt'],
              JWTPayload: req.user
    })
}
)

module.exports = router;