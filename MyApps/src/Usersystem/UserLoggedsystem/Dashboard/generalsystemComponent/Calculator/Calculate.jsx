import { useState, useEffect } from 'react';
import { Calculator, History } from 'lucide-react';


const Calculate = () => {
   const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculator-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculator-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (calculation, result) => {
    const newEntry = {
      id: Date.now(),
      calculation,
      result,
      timestamp: new Date().toLocaleString(),
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep only last 10 entries
  };

  const handleNumber = (num) => {
    setDisplay(prev => prev === '0' ? num.toString() : prev + num);
  };

  const handleOperator = (op) => {
    setDisplay(prev => prev + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    setDisplay(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleCalculate = () => {
    try {
      // Simple evaluation for basic operations
      const sanitized = display.replace(/[^0-9+\-*/().\s]/g, '');
      const result = eval(sanitized);
      
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
        return;
      }

      const formattedResult = result.toString();
      addToHistory(display, formattedResult);
      setDisplay(formattedResult);
    } catch {
      setDisplay('Error');
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const useHistoryResult = (result) => {
    setDisplay(result);
    setShowHistory(false);
  };

  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    
    return new Intl.NumberFormat('en-bd', {
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="bg-white rounded-2xl w-4/5  shadow-lg p-6 text-black">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Quick Calculator</h3>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <History className="h-4 w-4" />
        </button>
      </div>

      {/* Display */}
      <div className="bg-gray-50 p-4 rounded-xl mb-4">
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 break-all">
            {display}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {!isNaN(parseFloat(display)) && formatCurrency(display)}
          </div>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">History</span>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Clear All
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-gray-500">No calculations yet</p>
          ) : (
            <div className="space-y-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white p-2 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                  onClick={() => { useHistoryResult(entry.result); }}
                >
                  <div className="text-sm">
                    <div className="text-gray-600">{entry.calculation}</div>
                    <div className="font-semibold text-blue-600">= {entry.result}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Calculator Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleBackspace}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-semibold transition-colors"
        >
          ⌫
        </button>
        <button
          onClick={() => handleOperator('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button onClick={() => handleNumber(7)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">7</button>
        <button onClick={() => handleNumber(8)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">8</button>
        <button onClick={() => handleNumber(9)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">9</button>
        <button
          onClick={() => handleOperator('*')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          ×
        </button>

        {/* Row 3 */}
        <button onClick={() => handleNumber(4)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">4</button>
        <button onClick={() => handleNumber(5)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">5</button>
        <button onClick={() => handleNumber(6)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">6</button>
        <button
          onClick={() => handleOperator('-')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          −
        </button>

        {/* Row 4 */}
        <button onClick={() => handleNumber(1)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">1</button>
        <button onClick={() => handleNumber(2)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">2</button>
        <button onClick={() => handleNumber(3)} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors">3</button>
        <button
          onClick={() => handleOperator('+')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleNumber(0)}
          className="col-span-2 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors"
        >
          0
        </button>
        <button
          onClick={() => handleNumber('.')}
          className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg font-semibold transition-colors"
        >
          .
        </button>
        <button
          onClick={handleCalculate}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          =
        </button>
      </div>
    </div>
  );
};


export default Calculate;