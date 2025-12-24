import React, { useState } from 'react';
import './CodeViewer.css';

const CodeViewer = ({ isOpen, onClose, projectData }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('main');

  const codeFiles = {
    main: {
      name: 'mvp_app.py',
      content: `from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path

# Ensure .env is loaded from the project directory
_env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=_env_path, override=True)
app = Flask(__name__, static_folder='.', static_url_path='')

# Configure CORS
frontend_url = os.getenv('FRONTEND_URL') or os.getenv('VERCEL_URL')
if frontend_url:
    if not frontend_url.startswith('http'):
        frontend_url = f"https://{frontend_url}"
    cors_origins = [frontend_url, 'http://127.0.0.1:5000', 'http://localhost:5000']
    CORS(app, origins=cors_origins)
else:
    CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///mvp_blood_bank.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# Models
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Donor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    blood_type = db.Column(db.String(5), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    user_type = db.Column(db.String(20), default='donor')
    is_available = db.Column(db.Boolean, default=True)
    availability_status = db.Column(db.String(20), default='Available')
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    last_donation_date = db.Column(db.DateTime, nullable=True)
    donation_count = db.Column(db.Integer, default=0)
    certificate_id = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Requester(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    user_type = db.Column(db.String(20), default='requester')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class BloodRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100), nullable=False)
    blood_type = db.Column(db.String(5), nullable=False)
    units_required = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    contact_phone = db.Column(db.String(15), nullable=False)
    status = db.Column(db.String(20), default='Pending')
    urgency = db.Column(db.String(20), default='Medium')
    notes = db.Column(db.Text, nullable=True)
    requester_email = db.Column(db.String(120), nullable=True)
    requester_name = db.Column(db.String(100), nullable=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('requester.id'), nullable=True)
    assigned_donor_id = db.Column(db.Integer, db.ForeignKey('donor.id'), nullable=True)
    admin_notes = db.Column(db.Text, nullable=True)
    rejection_reason = db.Column(db.Text, nullable=True)
    admin_action_date = db.Column(db.DateTime, nullable=True)
    assignment_date = db.Column(db.DateTime, nullable=True)
    completion_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    requester = db.relationship('Requester', backref='blood_requests')
    assigned_donor = db.relationship('Donor', backref='assigned_requests')

# API Routes
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    admin = Admin.query.filter_by(email=email, password=password).first()
    if admin:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/donors', methods=['GET'])
def get_donors():
    donors = Donor.query.all()
    return jsonify([{
        'id': donor.id,
        'name': donor.name,
        'email': donor.email,
        'phone': donor.phone,
        'blood_type': donor.blood_type,
        'city': donor.city,
        'is_available': donor.is_available,
        'availability_status': donor.availability_status,
        'donation_count': donor.donation_count,
        'created_at': donor.created_at.isoformat()
    } for donor in donors])

@app.route('/api/requests', methods=['GET'])
def get_requests():
    requests = BloodRequest.query.all()
    return jsonify([{
        'id': request.id,
        'patient_name': request.patient_name,
        'blood_type': request.blood_type,
        'units_required': request.units_required,
        'location': request.location,
        'contact_phone': request.contact_phone,
        'status': request.status,
        'urgency': request.urgency,
        'notes': request.notes,
        'requester_email': request.requester_email,
        'requester_name': request.requester_name,
        'created_at': request.created_at.isoformat()
    } for request in requests])

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    total_donors = Donor.query.count()
    total_requests = BloodRequest.query.count()
    pending_requests = BloodRequest.query.filter_by(status='Pending').count()
    completed_requests = BloodRequest.query.filter_by(status='Completed').count()
    
    return jsonify({
        'total_donors': total_donors,
        'total_requests': total_requests,
        'pending_requests': pending_requests,
        'completed_requests': completed_requests
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)`
    },
    requirements: {
      name: 'requirements.txt',
      content: `Flask==2.3.3
Flask-SQLAlchemy==3.0.5
Flask-CORS==4.0.0
openai>=1.43.0
python-dotenv>=1.0.1
gunicorn==20.1.0`
    },
    readme: {
      name: 'README.md',
      content: `# 🩸 MVP Blood Bank Platform - RAKT DHARA

A simplified, all-in-one blood bank management system with essential features for donor registration, blood requests, and admin management.

## 🎯 Two User Types System

### 🩸 Blood Donors
- **Registration:** Name, Email, Phone, Blood Type, City, Password
- **Features:** Can donate blood, view their profile, update information
- **Login:** Uses donor credentials to access donor dashboard
- **Purpose:** Provide blood donations to help patients in need

### 🏥 Blood Requesters
- **Registration:** Name, Email, Phone, City, Password
- **Features:** Can request blood, view request status, manage requests
- **Login:** Uses requester credentials to access requester dashboard
- **Purpose:** Request blood for patients who need transfusions

### 👨‍💼 Admin
- **Access:** Full system control and management
- **Features:** Manage donors, requesters, requests, blood inventory
- **Login:** Admin credentials for complete system oversight
- **Purpose:** Oversee the entire blood bank operation

## 🎯 Features

### 👤 User Management
- Donor Registration
- Admin Authentication
- User Session Management

### 🩸 Blood Request System
- Create Blood Requests
- View Request Status
- Update Request Status (Accept/Reject)
- Request History

### 📊 Dashboard & Analytics
- Total Donors Count
- Total Requests Count
- Pending Requests Count
- Real-time Statistics

### 🔐 Security Features
- Admin Login System
- Session Management
- Form Validation
- Data Protection

## 🛠️ Technology Stack
- **Backend:** Flask (Python)
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Styling:** Custom CSS with responsive design

## 🚀 Quick Start

1. **Install Dependencies:**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. **Run the Application:**
   \`\`\`bash
   python mvp_app.py
   \`\`\`

3. **Access the Application:**
   - Main Interface: http://127.0.0.1:5000
   - Admin Dashboard: http://127.0.0.1:5000/admin`
    }
  };

  return (
    <div className="code-viewer-overlay">
      <div className="code-viewer-modal">
        <div className="code-viewer-header">
          <div className="code-viewer-title">
            <h3>{projectData?.title} - Source Code</h3>
            <p className="text-sm text-white/70">Explore the codebase of this AI-powered blood bank management system</p>
          </div>
          <button 
            onClick={onClose}
            className="code-viewer-close"
            aria-label="Close code viewer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" l="6" y2="18"></line>
              <line x1="6" y1="6" l="6" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="code-viewer-tabs">
          {Object.keys(codeFiles).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`code-viewer-tab ${activeTab === tabKey ? 'active' : ''}`}
            >
              {codeFiles[tabKey].name}
            </button>
          ))}
        </div>

        <div className="code-viewer-content">
          <div className="code-viewer-file-header">
            <span className="code-viewer-filename">{codeFiles[activeTab].name}</span>
            <div className="code-viewer-actions">
              <button 
                onClick={() => navigator.clipboard.writeText(codeFiles[activeTab].content)}
                className="code-viewer-copy"
                title="Copy to clipboard"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
              </button>
            </div>
          </div>
          
          <div className="code-viewer-code">
            <pre><code>{codeFiles[activeTab].content}</code></pre>
          </div>
        </div>

        <div className="code-viewer-footer">
          <div className="code-viewer-info">
            <span className="text-xs text-white/60">
              Lines: {codeFiles[activeTab].content.split('\n').length} | 
              Characters: {codeFiles[activeTab].content.length}
            </span>
          </div>
          <div className="code-viewer-links">
            <a 
              href="https://github.com/Jimmy-alt-code/RAKTDHARA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="code-viewer-github"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;

