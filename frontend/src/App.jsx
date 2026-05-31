import { useEffect, useMemo, useState, Fragment } from 'react';
import api from './api';
import './App.css';

// Τοπικές fallback εικόνες — βάλε τα αρχεία στον φάκελο: frontend/public/images/
// (χρησιμοποιούνται όταν η βάση δεν έχει image_url ή το URL αποτύχει)
const FALLBACK_IMAGES = {
  theatre: [
    '/images/theatre1.jpg',
    '/images/theatre2.jpg',
    '/images/theatre3.jpg',
  ],
  show: [
    '/images/show1.jpg',
    '/images/show2.jpg',
    '/images/show3.jpg',
    '/images/show4.jpg',
  ],
};

// Shows: DB image first → built-in fallback → emoji placeholder (final)
function CardImage({ src, alt, type = 'show', index = 0 }) {
  const list = FALLBACK_IMAGES[type] || FALLBACK_IMAGES.show;
  const fallback = list[index % list.length];

  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [stage, setStage] = useState(src ? 'db' : 'fallback');

  const handleError = () => {
    if (stage === 'db') {
      setImgSrc(fallback);
      setStage('fallback');
    } else {
      setImgSrc(null);
      setStage('placeholder');
    }
  };

  if (!imgSrc) {
    return (
      <div className={`card-image card-image-placeholder ${type}`}>
        <span className="card-image-icon">
          {type === 'theatre' ? '🎭' : '🎬'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="card-image"
      loading="lazy"
      onError={handleError}
    />
  );
}

export default function App() {
  const [mode, setMode] = useState('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('andreas@test.com');
  const [password, setPassword] = useState('123456');

  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  const login = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true);
      setMessage('Login successful');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  const signup = async () => {
    try {
      await api.post('/auth/register', { name, email, password });
      setMessage('Sign up successful. You can now log in.');
      setMode('login');
      setName('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Sign up failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setTheatres([]);
    setShows([]);
    setShowtimes([]);
    setSeats([]);
    setReservations([]);
    setSelectedShow(null);
    setSelectedShowtime('');
    setSelectedSeats([]);
    setSearchTerm('');
    setMessage('Logged out');
  };

  const loadTheatres = async (term = searchTerm) => {
    try {
      const res = await api.get('/theatres', {
        params: { q: term || undefined },
      });
      setTheatres(res.data || []);
    } catch {
      setMessage('Failed to load theatres');
    }
  };

  const loadShows = async (term = searchTerm) => {
    try {
      const res = await api.get('/shows', {
        params: { q: term || undefined },
      });
      setShows(res.data || []);
    } catch {
      setMessage('Failed to load shows');
    }
  };

  const handleSearch = async () => {
    setSelectedShow(null);
    setSelectedShowtime('');
    setSeats([]);
    setSelectedSeats([]);
    setShowtimes([]);
    await loadTheatres(searchTerm);
    await loadShows(searchTerm);
  };

  const handleClear = async () => {
    setSearchTerm('');
    setSelectedShow(null);
    setSelectedShowtime('');
    setSeats([]);
    setSelectedSeats([]);
    setShowtimes([]);

    try {
      const [theatresRes, showsRes] = await Promise.all([
        api.get('/theatres'),
        api.get('/shows'),
      ]);
      setTheatres(theatresRes.data || []);
      setShows(showsRes.data || []);
    } catch {
      setMessage('Failed to reset search');
    }
  };

  const loadShowDetails = async (showId) => {
    try {
      const res = await api.get(`/shows/${showId}`);
      setSelectedShow(res.data);
      setSelectedShowtime('');
      setSeats([]);
      setSelectedSeats([]);
      setShowtimes([]);
      await loadShowtimes(showId);
      setTimeout(() => {
        document.getElementById('details-anchor')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load show details');
    }
  };

  const loadShowtimes = async (showIdParam) => {
    try {
      const showId = showIdParam || selectedShow?.show_id;
      if (!showId) return;

      const res = await api.get('/showtimes', {
        params: { showId },
      });

      setShowtimes(res.data || []);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load showtimes');
    }
  };

  const loadSeats = async (showtimeId) => {
    try {
      const res = await api.get(`/seats/${showtimeId}`);
      setSeats(res.data || []);
      setSelectedSeats([]);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load seats');
    }
  };

  const loadReservations = async () => {
    try {
      const res = await api.get('/reservations/my');
      setReservations(res.data || []);
    } catch {
      setMessage('Failed to load reservations');
    }
  };

  const toggleSeat = (seat) => {
    if (seat.is_reserved) return;

    setSelectedSeats((prev) =>
      prev.includes(seat.seat_id)
        ? prev.filter((id) => id !== seat.seat_id)
        : [...prev, seat.seat_id]
    );
  };

  const createReservation = async () => {
    try {
      const res = await api.post('/reservations', {
        showtime_id: Number(selectedShowtime),
        seats: selectedSeats,
      });

      setMessage(`Reservation created successfully. ID: ${res.data.reservationId}`);
      await loadSeats(selectedShowtime);
      await loadReservations();
      setSelectedSeats([]);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reservation failed');
    }
  };

  const cancelReservation = async (reservationId) => {
    try {
      await api.delete(`/reservations/${reservationId}`);
      setMessage('Reservation cancelled successfully');

      setReservations((prev) =>
        prev.filter((r) => r.reservation_id !== reservationId)
      );

      if (selectedShowtime) await loadSeats(selectedShowtime);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Cancel failed');
    }
  };

  useEffect(() => {
    if (loggedIn) {
      loadTheatres();
      loadShows();
      loadReservations();
    }
  }, [loggedIn]);

  const groupedReservations = useMemo(() => {
    const map = {};

    reservations.forEach((r) => {
      if (!map[r.reservation_id]) {
        map[r.reservation_id] = {
          reservation_id: r.reservation_id,
          show_title: r.show_title,
          show_date: r.show_date,
          show_time: r.show_time,
          status: r.status,
          total_price: r.total_price,
          seats: [],
        };
      }

      if (r.row_label && r.seat_number) {
        map[r.reservation_id].seats.push(`${r.row_label}${r.seat_number}`);
      }
    });

    return Object.values(map);
  }, [reservations]);

  // Group seats by row label, sorted by seat number — for theatrical row layout
  const seatsByRow = useMemo(() => {
    const grouped = {};
    seats.forEach((seat) => {
      if (!grouped[seat.row_label]) grouped[seat.row_label] = [];
      grouped[seat.row_label].push(seat);
    });
    Object.keys(grouped).forEach((row) => {
      grouped[row].sort((a, b) => a.seat_number - b.seat_number);
    });
    return grouped;
  }, [seats]);

  return (
    <div className="page">
      <div className="container">
        <header className="app-header">
          <div className="title-row">
            <span className="title-deco left">🎭</span>
            <h1 className="title">Theatre Booking</h1>
            <span className="title-deco right">🎭</span>
          </div>
          <p className="subtitle">Κλείσε θέση για την αγαπημένη σου παράσταση</p>
        </header>

        {!loggedIn ? (
          <div className="card auth-box">
            <div className="mode-switch">
              <button
                className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setMode('login'); setMessage(''); }}
              >
                Login
              </button>
              <button
                className={`btn ${mode === 'signup' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setMode('signup'); setMessage(''); }}
              >
                Sign Up
              </button>
            </div>

            {mode === 'signup' && (
              <>
                <h2 className="section-title">Sign Up</h2>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </>
            )}

            {mode === 'login' && <h2 className="section-title">Login</h2>}

            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ marginBottom: 10 }}
            />

            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ marginBottom: 10 }}
            />

            {mode === 'login' ? (
              <button className="btn btn-primary btn-block" onClick={login}>Login</button>
            ) : (
              <button className="btn btn-primary btn-block" onClick={signup}>Create Account</button>
            )}

            {message && <div className="message">{message}</div>}
          </div>
        ) : (
          <>
            <div className="top-actions">
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>

            <div className="card section">
              <h2 className="section-title">Search</h2>
              <div className="toolbar">
                <input
                  className="input search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by location, theatre or show"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Theatres</h2>
              {theatres.length === 0 ? (
                <p className="empty-state">No theatres found.</p>
              ) : (
                <div className="grid">
                  {theatres.map((theatre, i) => (
                    <div key={theatre.theatre_id} className="card media-card">
                      <CardImage
                        src={theatre.image_url}
                        alt={theatre.name}
                        type="theatre"
                        index={i}
                      />
                      <div className="card-body">
                        <h3>{theatre.name}</h3>
                        <p className="meta"><span className="meta-icon">📍</span> {theatre.location}</p>
                        {theatre.description && <p className="description">{theatre.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="section">
              <h2 className="section-title">Shows</h2>
              {shows.length === 0 ? (
                <p className="empty-state">No shows found.</p>
              ) : (
                <div className="grid">
                  {shows.map((show, i) => (
                    <div key={show.show_id} className="card media-card">
                      <CardImage
                        src={show.image_url}
                        alt={show.title}
                        type="show"
                        index={i}
                      />
                      <div className="card-body">
                        <h3>{show.title}</h3>
                        <p className="meta"><span className="meta-icon">🎭</span> {show.theatre_name}</p>
                        <p className="meta"><span className="meta-icon">📍</span> {show.location}</p>
                        <div className="badges">
                          <span className="badge">⏱ {show.duration} min</span>
                          <span className="badge">{show.age_rating}</span>
                        </div>
                        <button
                          className="btn btn-primary btn-block"
                          onClick={() => loadShowDetails(show.show_id)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div id="details-anchor" />

            {selectedShow && (
              <div className="card details-box">
                {selectedShow.image_url && (
                  <img
                    src={selectedShow.image_url}
                    alt={selectedShow.title}
                    className="details-hero"
                  />
                )}

                <div className="details-body">
                  <h2 className="section-title">Show Details</h2>
                  <h3 className="details-title">{selectedShow.title}</h3>
                  {selectedShow.description && <p className="description">{selectedShow.description}</p>}
                  <div className="details-meta">
                    <p><strong>Theatre:</strong> {selectedShow.theatre_name}</p>
                    <p><strong>Location:</strong> {selectedShow.location}</p>
                    <p><strong>Duration:</strong> {selectedShow.duration} min</p>
                    <p><strong>Age Rating:</strong> {selectedShow.age_rating}</p>
                  </div>

                  <h3 className="section-title">Available Showtimes</h3>
                  <select
                    className="select"
                    value={selectedShowtime}
                    onChange={(e) => {
                      setSelectedShowtime(e.target.value);
                      if (e.target.value) loadSeats(e.target.value);
                      else setSeats([]);
                    }}
                  >
                    <option value="">Select a showtime</option>
                    {showtimes.map((st) => (
                      <option key={st.showtime_id} value={st.showtime_id}>
                        #{st.showtime_id} — {String(st.show_date).slice(0, 10)} {st.show_time} | {st.hall_name} | €{st.base_price}
                      </option>
                    ))}
                  </select>

                  {showtimes.length === 0 && <p className="empty-state">No showtimes found.</p>}

                  {selectedShowtime && (
                    <>
                      <h3 className="section-title">Seats</h3>
                      <div className="seat-legend">
                        <span><span className="legend-swatch available"></span> Available</span>
                        <span><span className="legend-swatch selected"></span> Selected</span>
                        <span><span className="legend-swatch reserved"></span> Reserved</span>
                      </div>

                      {/* Theatrical stage indicator */}
                      <div className="stage-area">
                        <div className="stage-bar">
                          <span className="stage-label">STAGE</span>
                        </div>
                      </div>

                      {/* Seats grouped by row with aisle gap */}
                      <div className="seat-rows">
                        {Object.entries(seatsByRow).map(([row, rowSeats]) => {
                          const midpoint = Math.ceil(rowSeats.length / 2);
                          return (
                            <div key={row} className="seat-row">
                              <span className="row-label">{row}</span>
                              <div className="seats-in-row">
                                {rowSeats.map((seat, idx) => {
                                  const isSelected = selectedSeats.includes(seat.seat_id);
                                  const seatClass = seat.is_reserved
                                    ? 'seat reserved'
                                    : isSelected
                                    ? 'seat selected'
                                    : 'seat available';

                                  return (
                                    <Fragment key={seat.seat_id}>
                                      {idx === midpoint && <div className="aisle" />}
                                      <button
                                        className={seatClass}
                                        onClick={() => toggleSeat(seat)}
                                        disabled={seat.is_reserved}
                                        title={`${seat.row_label}${seat.seat_number}${seat.is_reserved ? ' (reserved)' : ''}`}
                                      >
                                        {seat.seat_number}
                                      </button>
                                    </Fragment>
                                  );
                                })}
                              </div>
                              <span className="row-label">{row}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="booking-bar">
                        <div className="booking-summary">
                          {selectedSeats.length > 0 ? (
                            <span>{selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected</span>
                          ) : (
                            <span className="muted">No seats selected</span>
                          )}
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={createReservation}
                          disabled={!selectedShowtime || selectedSeats.length === 0}
                        >
                          Book Selected Seats
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {message && <div className="message">{message}</div>}

            <div className="section">
              <h2 className="section-title">My Reservations</h2>
              {groupedReservations.filter((r) => r.status === 'active').length === 0 ? (
                <p className="empty-state">No active reservations.</p>
              ) : (
                groupedReservations
                  .filter((r) => r.status === 'active')
                  .map((r) => (
                    <div key={r.reservation_id} className="card reservation-item ticket">
                      <div className="ticket-stub" />
                      <div className="reservation-header">
                        <h3>{r.show_title}</h3>
                        <span className="reservation-id">#{r.reservation_id}</span>
                      </div>
                      <p><strong>📅 Date:</strong> {String(r.show_date).slice(0, 10)} {r.show_time}</p>
                      <p><strong>💺 Seats:</strong> {r.seats.length ? r.seats.join(', ') : 'None'}</p>
                      <p><strong>💶 Total:</strong> €{r.total_price}</p>
                      <p><strong>Status:</strong> <span className="status-active">{r.status}</span></p>
                      <button className="btn btn-danger" onClick={() => cancelReservation(r.reservation_id)}>
                        Cancel Reservation
                      </button>
                    </div>
                  ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
