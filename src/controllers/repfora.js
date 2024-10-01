import Authetication from '../services/authService.js'


const useRepfora = {
    login: async (req, res) => {
        const { email, password, role } = req.body;
        try {
            const token = await Authetication.login(email, password, role);
            res.json({ token });
        } catch (error) {
            res.status(401).json({
                message: error.message,
                status: 401
            });
        }
    },

    listallinstructors: async (req, res) => {
        try {
          const data = await Authetication.AutheticatedRequest('get', '/api/instructors');
          res.json(data);
        } catch (error) {
          res.status(500).json({
            message: error.message,
            status: 500
          });
        }
      },

    listinstructorbyid: async (req, res) => {
        const { id } = req.params;
        try {
          const data = await Authetication.AutheticatedRequest('get', `/api/instructors/${id}`);
          res.json(data);
        } catch (error) {
          res.status(500).json({
            message: error.message,
            status: 500
          });
        }
      },
    listallfiches: async (req, res) => {
        try {
          const data = await Authetication.AutheticatedRequest('get', '/api/fiches');
          res.json(data);
        } catch (error) {
          res.status(500).json({
            message: error.message,
            status: 500
          });
        }
      },

    listafichebyid: async (req, res) => {
        const { id } = req.params;
        try {
          const data = await Authetication.AutheticatedRequest('get', `/api/fiches/${id}`);
          res.json(data);
        } catch (error) {
          res.status(500).json({
            message: error.message,
            status: 500
          });
        }
      }
}

export default useRepfora
