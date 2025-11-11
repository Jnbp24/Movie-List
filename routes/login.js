import express, { response } from 'express';

const router = express.Router();


router.post('/loginUser', (req, res) => {
    const { username, password } = req.body;

    // Example login check (replace with real authentication)
    if (username === "admin" && password === "password") {
        // Redirect to home or dashboard
        return response.redirect('homepage');
    } else {
        // Re-render login page with error
        return response.render('loginpage', { Title: "Login", error: "Invalid credentials" });
    }
});

router.get('/loginUser', (req, res) => {
    res.render('loginpage', { Title: "Login" });
});

export default router;