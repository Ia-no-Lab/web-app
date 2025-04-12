import React, { useState, useEffect } from "react";
import api from "../../api";
import { Tooltip } from "../ui/tooltip";
import "./PeriodicTable.css";

const ElementCard = ({ element, onClick }) => {
  const { atomic_number, symbol, name, atomic_mass, category } = element;

  return (
    <Tooltip
      content={
        <div className="element-tooltip">
          <h3>{name}</h3>
          <p>Atomic Number: {atomic_number}</p>
          <p>Atomic Mass: {atomic_mass}</p>
          <p>Category: {category}</p>
          <p>Click for more details</p>
        </div>
      }
    >
      <div
        className={`element-card ${category}`}
        onClick={() => onClick(element)}
      >
        <div className="atomic-number">{atomic_number}</div>
        <div className="symbol">{symbol}</div>
        <div className="name">{name}</div>
        <div className="atomic-mass">{atomic_mass}</div>
      </div>
    </Tooltip>
  );
};

const ElementDetails = ({ element, onClose }) => {
  if (!element) return null;

  return (
    <div className="element-details-overlay">
      <div className="element-details">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>
          {element.name} ({element.symbol})
        </h2>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Atomic Number:</span>
            <span className="detail-value">{element.atomic_number}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Atomic Mass:</span>
            <span className="detail-value">{element.atomic_mass}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{element.category}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Period:</span>
            <span className="detail-value">{element.period}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Block:</span>
            <span className="detail-value">{element.block}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Electron Configuration:</span>
            <span className="detail-value">
              {element.electron_configuration}
            </span>
          </div>
        </div>
        {element.description && (
          <div className="element-description">
            <h3>Description</h3>
            <p>{element.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await api.get("/periodic-table/elements");
        setElements(response.data);
      } catch (error) {
        console.error("Error loading periodic table:", error);
        setError("Failed to load periodic table data");
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const closeElementDetails = () => {
    setSelectedElement(null);
  };

  const filteredElements = filterCategory
    ? elements.filter((element) => element.category === filterCategory)
    : elements;

  if (loading) return <div className="loading">Loading periodic table...</div>;
  if (error) return <div className="error">{error}</div>;

  // Categories for filter buttons
  const categories = [
    { name: "all", label: "All Elements" },
    { name: "nonmetal", label: "Nonmetals" },
    { name: "noble gas", label: "Noble Gases" },
    { name: "alkali metal", label: "Alkali Metals" },
    { name: "alkaline earth metal", label: "Alkaline Earth Metals" },
    { name: "metalloid", label: "Metalloids" },
    { name: "halogen", label: "Halogens" },
    { name: "transition metal", label: "Transition Metals" },
    { name: "post-transition metal", label: "Post-Transition Metals" },
    { name: "lanthanide", label: "Lanthanides" },
    { name: "actinide", label: "Actinides" },
  ];

  return (
    <div className="periodic-table-container">
      <h1>Interactive Periodic Table</h1>

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`filter-button ${
              filterCategory === category.name ? "active" : ""
            }`}
            onClick={() =>
              setFilterCategory(category.name === "all" ? "" : category.name)
            }
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="periodic-table">
        {filteredElements.map((element) => (
          <ElementCard
            key={element.atomic_number}
            element={element}
            onClick={handleElementClick}
          />
        ))}
      </div>

      {selectedElement && (
        <ElementDetails
          element={selectedElement}
          onClose={closeElementDetails}
        />
      )}
    </div>
  );
};

export default PeriodicTable;
