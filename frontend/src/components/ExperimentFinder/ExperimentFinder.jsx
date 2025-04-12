import React, { useState } from "react";
import api from "../../api";
import { Button } from "../ui/button";
import "./ExperimentFinder.css";

const ExperimentFinder = () => {
  const [currentItem, setCurrentItem] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const handleAddItem = () => {
    if (currentItem.trim() === "") return;

    // Add item to the list if it's not already there
    if (!itemsList.includes(currentItem.trim().toLowerCase())) {
      const newItemsList = [...itemsList, currentItem.trim().toLowerCase()];
      setItemsList(newItemsList);
    }

    setCurrentItem("");
  };

  const handleRemoveItem = (itemToRemove) => {
    const newItemsList = itemsList.filter((item) => item !== itemToRemove);
    setItemsList(newItemsList);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const findExperiments = async () => {
    if (itemsList.length === 0) {
      setError("Por favor, adicione pelo menos um item");
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const response = await api.post("/experiments/recommend", {
        items: itemsList,
      });
      setRecommendations(response.data);
    } catch (err) {
      setError(
        "Falha ao buscar recomendações de experimentos. Por favor, tente novamente."
      );
      console.error("Error fetching experiment recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const viewExperimentDetails = (experiment) => {
    setSelectedExperiment(experiment);
  };

  const closeExperimentDetails = () => {
    setSelectedExperiment(null);
  };

  return (
    <div className="experiment-finder-container">
      <h1>Descubra Experimentos</h1>
      <p className="intro-text">
        Adicione os materiais que você tem disponíveis e encontraremos
        experimentos científicos que você pode realizar.
      </p>

      <div className="items-input-container">
        <div className="input-group">
          <input
            type="text"
            value={currentItem}
            onChange={(e) => setCurrentItem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite um material (ex: vinagre, bicarbonato)"
            className="item-input"
          />
          <Button onClick={handleAddItem} bg="#3c6b22ff" color="#f4f4f4">
            Adicionar
          </Button>
        </div>

        {itemsList.length > 0 && (
          <div className="items-list">
            <h3>Seus materiais:</h3>
            <div className="items-tags">
              {itemsList.map((item, index) => (
                <div key={index} className="item-tag">
                  {item}
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="remove-item-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={findExperiments}
          loading={loading}
          disabled={itemsList.length === 0}
          bg="#3c6b22ff"
          color="#f4f4f4"
          className="find-button"
        >
          Encontrar Experimentos
        </Button>

        {error && <div className="error-message">{error}</div>}
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations-container">
          <h2>Experimentos Recomendados</h2>
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <h3>{rec.experiment.name}</h3>
                <div className="match-info">
                  <div className="match-percentage">
                    {Math.round(rec.match_percentage * 100)}% de compatibilidade
                  </div>
                  <div className="match-bar">
                    <div
                      className="match-bar-fill"
                      style={{ width: `${rec.match_percentage * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="experiment-description">
                  {rec.experiment.description.length > 150
                    ? `${rec.experiment.description.substring(0, 150)}...`
                    : rec.experiment.description}
                </p>
                {rec.missing_items.length > 0 && (
                  <div className="missing-items">
                    <h4>Itens que faltam:</h4>
                    <ul>
                      {rec.missing_items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button
                  onClick={() => viewExperimentDetails(rec.experiment)}
                  bg="#3c6b22ff"
                  color="#f4f4f4"
                  className="view-details-btn"
                >
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedExperiment && (
        <div className="experiment-details-overlay">
          <div className="experiment-details">
            <button className="close-button" onClick={closeExperimentDetails}>
              ×
            </button>
            <h2>{selectedExperiment.name}</h2>
            <div className="experiment-full-description">
              <p>{selectedExperiment.description}</p>
            </div>
            <div className="required-items">
              <h3>Materiais Necessários:</h3>
              <ul>
                {selectedExperiment.items.map((item, index) => (
                  <li key={index}>
                    {item}
                    {itemsList.includes(item) && (
                      <span className="item-available"> (disponível)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperimentFinder;
