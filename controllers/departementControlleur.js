const Departement = require('../modele/departementModel');

class DepartementController {
  async getAllDepartements(req, res) {
    try {
      const departements = await Departement.findAll();
      res.status(200).json(departements);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des départements.' });
    }
  }

  async getDepartementById(req, res) {
    const { id } = req.params;
    try {
      const departement = await Departement.findByPk(id);
      if (!departement) {
        return res.status(404).json({ error: 'Département introuvable.' });
      }
      res.status(200).json(departement);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération du département.' });
    }
  }

  async createDepartement(req, res) {
    const { nom } = req.body;
    try {
      const newDepartement = await Departement.create({ nom });
      res.status(201).json(newDepartement);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du département.' });
    }
  }

  async updateDepartement(req, res) {
    const { id } = req.params;
    const { nom } = req.body;
    try {
      const departement = await Departement.findByPk(id);
      if (!departement) {
        return res.status(404).json({ error: 'Département introuvable.' });
      }
      departement.nom = nom;
      await departement.save();
      res.status(200).json(departement);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du département.' });
    }
  }

  async deleteDepartement(req, res) {
    const { id } = req.params;
    try {
      const departement = await Departement.findByPk(id);
      if (!departement) {
        return res.status(404).json({ error: 'Département introuvable.' });
      }
      await departement.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du département.' });
    }
  }
  async searchDepartement(req, res) {
    const { id, nom } = req.query;
    try {
      let departements;
      if (id) {
        departements = await Departement.findByPk(id);
      } else if (nom) {
        departements = await Departement.findOne({
          where: {
            nom: nom,
          },
        });
      } else {
        return res.status(400).json({ error: 'Paramètres de recherche manquants.' });
      }
  
      if (!departements) {
        return res.status(404).json({ error: 'Département non trouvé.' });
      }
      res.status(200).json(departements);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la recherche du département.' });
    }
  }
  
}

module.exports = new DepartementController();
