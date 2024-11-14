// DictionaryPage.js
import React, { useState } from 'react';
import './DictionaryPage.css';

function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);

  const terms = [
    { term: 'Budget', definition: 'A plan that outlines your expected income and expenses over a certain period.' },
    { term: 'Interest', definition: 'The cost of borrowing money, usually expressed as a percentage.' },
    { term: 'Savings', definition: 'Money that you set aside for future use, typically in a savings account.' },
    { term: 'Investment', definition: 'Putting money into something with the expectation of gaining a return.' },
    { term: 'Debt', definition: 'Money that is owed or due to be paid to another party.' },
    { term: 'Credit Score', definition: 'A numerical rating that represents the creditworthiness of an individual.' },
    { term: 'Emergency Fund', definition: 'Money set aside to cover unexpected expenses or financial emergencies.' },
    { term: 'Compound Interest', definition: 'Interest calculated on both the principal and the accrued interest.' },
    { term: 'Income', definition: 'Money earned from work, investments, or other sources.' },
    { term: 'Expense', definition: 'The cost incurred for goods or services.' },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = terms.filter((term) =>
      term.term.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTerms(results);
  };

  return (
    <div className="dictionary-page-container">
      <header className="header">
        <h1>Financial Dictionary</h1>
        <h2>Understand Key Financial Terms</h2>
      </header>

      <main className="main-content">
        <section className="search-section">
          <input
            type="text"
            placeholder="Search for a term..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </section>

        <section className="terms-section">
          {searchTerm === '' && (
            <p className="hint">Type in the search box above to find financial terms and their definitions.</p>
          )}
          {filteredTerms.length > 0 ? (
            <ul className="terms-list">
              {filteredTerms.map((item, index) => (
                <li key={index} className="term-item">
                  <strong>{item.term}</strong>: {item.definition}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm !== '' && <p>No terms found for "{searchTerm}"</p>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 My Financial Pathways - Empowering your financial journey for the ones to come.</p>
      </footer>
    </div>
  );
}

export default DictionaryPage;
