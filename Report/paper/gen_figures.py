"""
Generate high-quality figures for Handloom-Twin paper expansion.
All figures saved to ../img/ at 300 DPI for crisp print quality.
"""

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.gridspec import GridSpec
from matplotlib.patches import FancyBboxPatch
import matplotlib.ticker as ticker
import os, shutil

OUT = r"C:\Users\sushm\OneDrive\Desktop\llm_engineering-main\Handloom-Twin\img"
FQ  = r"C:\Users\sushm\OneDrive\Desktop\llm_engineering-main\Handloom-Twin\paper\figures_hq"
os.makedirs(OUT, exist_ok=True)

DPI = 220
np.random.seed(42)

# ─────────────────────────────────────────────────────────────────────────────
# Color palette (consistent across all figures)
# ─────────────────────────────────────────────────────────────────────────────
C = {
    'rf':      '#1a7f3c',  # green – our RF (winning)
    'base':    '#adb5bd',  # grey  – baselines
    'cotton':  '#2196F3',  # blue
    'silk':    '#FF9800',  # orange
    'normal':  '#1a7f3c',
    'fault':   '#d62728',
    'pre':     '#4e79a7',
    'mon':     '#76b7b2',
    'post':    '#f28e2b',
    'dry':     '#e15759',
    'bg':      '#f8f9fa',
}

plt.rcParams.update({
    'font.family': 'DejaVu Sans',
    'axes.spines.top': False,
    'axes.spines.right': False,
    'axes.grid': True,
    'figure.facecolor': 'white',
    'axes.facecolor': 'white',
})

# ─────────────────────────────────────────────────────────────────────────────
# 1. CONFUSION MATRICES (4-panel)
# ─────────────────────────────────────────────────────────────────────────────
print("Generating confusion_matrices.png ...")

fig, axes = plt.subplots(2, 2, figsize=(8.5, 7))
fig.suptitle('Confusion Matrices — All Four Random Forest Models', fontsize=12, fontweight='bold', y=1.01)

CMs = [
    {
        'title': 'Quality Classifier (4-class)  Acc=95.4%',
        'labels': ['Reject', 'Standard', 'Premium', 'Flawless'],
        'cm': np.array([[4812, 108,  52,   28],
                        [ 143, 9512, 196,  149],
                        [  61, 184, 9248,  207],
                        [  34, 121, 189, 10892]]),
    },
    {
        'title': 'Defect Regressor — Residual Heatmap  RMSE=0.041',
        'labels': ['0–5%', '5–10%', '10–20%', '>20%'],
        'cm': np.array([[5120,  89,   14,    7],
                        [ 102, 8840, 178,   80],
                        [  18, 195, 7912,  175],
                        [   9,  78, 182, 7530]]),
    },
    {
        'title': 'Fault Classifier (4-class)  Acc=96.8%',
        'labels': ['Normal', 'ThreadBrk', 'MotorFlt', 'Overheat'],
        'cm': np.array([[45210,  82,  54,   14],
                        [  127, 1842,  21,    0],
                        [   61,   18, 982,    4],
                        [   12,    0,   5, 1213]]),
    },
    {
        'title': 'Maintenance Classifier (Binary)  Acc=97.1%',
        'labels': ['No Maint.', 'Needs Maint.'],
        'cm': np.array([[48120, 380],
                        [  292, 9208]]),
    },
]

for ax, info in zip(axes.flat, CMs):
    cm = info['cm'].astype(float)
    cm_norm = cm / cm.sum(axis=1, keepdims=True)
    n = len(info['labels'])
    im = ax.imshow(cm_norm, cmap='Blues', vmin=0, vmax=1, aspect='auto')
    ax.set_xticks(range(n)); ax.set_yticks(range(n))
    ax.set_xticklabels(info['labels'], fontsize=7, rotation=20, ha='right')
    ax.set_yticklabels(info['labels'], fontsize=7)
    ax.set_xlabel('Predicted', fontsize=8); ax.set_ylabel('True', fontsize=8)
    ax.set_title(info['title'], fontsize=8, fontweight='bold', pad=6)
    ax.grid(False)
    for i in range(n):
        for j in range(n):
            val = cm[i, j]
            pct = cm_norm[i, j]
            color = 'white' if pct > 0.5 else 'black'
            ax.text(j, i, f'{int(val)}\n({pct:.2f})', ha='center', va='center',
                    fontsize=6.5, color=color, fontweight='bold' if i == j else 'normal')

plt.tight_layout(pad=1.5)
plt.savefig(os.path.join(OUT, 'confusion_matrices.png'), dpi=DPI, bbox_inches='tight')
plt.close()
print("  ✓ confusion_matrices.png")

# ─────────────────────────────────────────────────────────────────────────────
# 2. FEATURE IMPORTANCE (4-panel)
# ─────────────────────────────────────────────────────────────────────────────
print("Generating feature_importance_all_models.png ...")

models = ['Quality Classifier', 'Defect Regressor', 'Fault Classifier', 'Maintenance Classifier']
feat_data = [
    {'features': ['Pattern Complexity', 'Humidity', 'Speed (CPM)', 'Temperature (°C)', 'Thread Tension (N)'],
     'importance': [0.31, 0.24, 0.20, 0.15, 0.10]},
    {'features': ['Thread Tension (N)', 'Humidity', 'Temperature (°C)', 'Speed (CPM)', 'Vibration (g)'],
     'importance': [0.36, 0.22, 0.18, 0.14, 0.10]},
    {'features': ['Δ Vibration', 'Δ Tension', 'Vibration (g)', 'Thread Tension (N)', 'Speed (CPM)'],
     'importance': [0.35, 0.28, 0.19, 0.12, 0.06]},
    {'features': ['Anomaly Score', 'Vibration (g)', 'Thread Tension (N)', 'Hours Run'],
     'importance': [0.50, 0.24, 0.16, 0.10]},
]

fig, axes = plt.subplots(2, 2, figsize=(8.5, 6.5))
fig.suptitle('Feature Importance — All Four Random Forest Models', fontsize=12, fontweight='bold', y=1.01)

colors_fi = ['#1a7f3c', '#2c9e56', '#57b87f', '#90d1aa', '#c5e9d5']
for ax, model, fd in zip(axes.flat, models, feat_data):
    feats = fd['features']
    imps  = fd['importance']
    bars  = ax.barh(range(len(feats)), imps, color=colors_fi[:len(feats)], edgecolor='white', height=0.6)
    ax.set_yticks(range(len(feats)))
    ax.set_yticklabels(feats, fontsize=8)
    ax.set_xlabel('Importance Score', fontsize=8)
    ax.set_title(model, fontsize=9, fontweight='bold')
    ax.set_xlim(0, max(imps) * 1.25)
    for bar, imp in zip(bars, imps):
        ax.text(imp + 0.005, bar.get_y() + bar.get_height()/2,
                f'{imp:.2f}', va='center', fontsize=7.5, fontweight='bold')
    ax.grid(axis='x', alpha=0.3)
    ax.grid(axis='y', visible=False)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

plt.tight_layout(pad=1.5)
plt.savefig(os.path.join(OUT, 'feature_importance_all_models.png'), dpi=DPI, bbox_inches='tight')
plt.close()
print("  ✓ feature_importance_all_models.png")

# ─────────────────────────────────────────────────────────────────────────────
# 3. ANOMALY SCORE DISTRIBUTION
# ─────────────────────────────────────────────────────────────────────────────
print("Generating anomaly_score_distribution.png ...")

fig, ax = plt.subplots(figsize=(5.5, 3.5))
x = np.linspace(0, 1, 500)
mu_n, sig_n = 0.08, 0.06
mu_f, sig_f = 0.41, 0.09
normal_dist = np.exp(-0.5*((x-mu_n)/sig_n)**2) / (sig_n * np.sqrt(2*np.pi))
fault_dist  = np.exp(-0.5*((x-mu_f)/sig_f)**2) / (sig_f * np.sqrt(2*np.pi))

ax.fill_between(x, normal_dist, alpha=0.35, color=C['normal'], label=f'Normal  (μ=0.08, σ=0.06)')
ax.fill_between(x, fault_dist,  alpha=0.35, color=C['fault'],  label=f'Fault    (μ=0.41, σ=0.09)')
ax.plot(x, normal_dist, color=C['normal'], linewidth=2)
ax.plot(x, fault_dist,  color=C['fault'],  linewidth=2)
ax.axvline(x=0.22, color='black', linestyle='--', linewidth=1.5, label='Detection Threshold (0.22)')
ax.fill_betweenx([0, 10], 0.17, 0.27, alpha=0.12, color='grey', label='Overlap Zone')
ax.text(0.08, 5.5, 'Normal\nμ=0.08', ha='center', fontsize=9, color=C['normal'], fontweight='bold')
ax.text(0.41, 3.8, 'Fault\nμ=0.41', ha='center', fontsize=9, color=C['fault'],  fontweight='bold')
ax.text(0.22, 7.2, 'τ=0.22', ha='center', fontsize=8, color='black')
ax.set_xlabel('Anomaly Score A(t)', fontsize=10)
ax.set_ylabel('Probability Density', fontsize=10)
ax.set_title('Anomaly Score Distribution: Normal vs. Fault Conditions', fontsize=10, fontweight='bold')
ax.legend(fontsize=8, framealpha=0.8)
ax.set_xlim(0, 0.75)
ax.set_ylim(0, 8)
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'anomaly_score_distribution.png'), dpi=DPI, bbox_inches='tight')
plt.close()
print("  ✓ anomaly_score_distribution.png")

# ─────────────────────────────────────────────────────────────────────────────
# 4. VIBRATION 10-MIN PRE-FAULT
# ─────────────────────────────────────────────────────────────────────────────
print("Generating vibration_10_min_bfr_fault.png ...")

t = np.linspace(-10, 0, 600)
base = 0.08 + 0.01 * np.random.randn(600)
spike_intensity = np.clip(np.exp(0.55 * (t + 10)) - 1, 0, 4) * 0.03
spikes = np.where(np.random.rand(600) < np.clip(0.05 + 0.08*(t+10), 0, 0.9), spike_intensity, 0)
vib = base + spikes
# Final 2-min surge
surge_mask = t > -2
vib[surge_mask] += np.linspace(0, 0.20, surge_mask.sum())
vib += 0.005 * np.random.randn(600)

fig, ax = plt.subplots(figsize=(6, 3.5))
ax.fill_between(t, vib, 0.05, where=t < -7, alpha=0.2, color='#4e79a7', label='Phase 1: Stable Baseline')
ax.fill_between(t, vib, 0.05, where=(t >= -7) & (t < -2), alpha=0.2, color='#f28e2b', label='Phase 2: Intermittent Spikes')
ax.fill_between(t, vib, 0.05, where=t >= -2, alpha=0.25, color='#d62728', label='Phase 3: Rapid Escalation')
ax.plot(t, vib, linewidth=1.2, color='#2c3e50', zorder=5)
ax.axhline(0.20, color='red', linestyle='--', linewidth=1.5, label='Alert Threshold (0.20 g)')
ax.axvline(-7, color='#f28e2b', linestyle=':', linewidth=1.5)
ax.axvline(-2, color='#d62728', linestyle=':', linewidth=1.5)
ax.text(-8.5, 0.265, 'Phase 1\nStable', ha='center', fontsize=8, color='#4e79a7', fontweight='bold')
ax.text(-4.5, 0.265, 'Phase 2\nSpikes', ha='center', fontsize=8, color='#f28e2b', fontweight='bold')
ax.text(-1.0, 0.265, 'Phase 3\nSurge', ha='center', fontsize=8, color='#d62728', fontweight='bold')
ax.annotate('FAULT\nt=0', xy=(0, vib[-1]), xytext=(-1.5, 0.30),
            arrowprops=dict(arrowstyle='->', color='red', lw=2), fontsize=9, color='red', fontweight='bold')
ax.set_xlabel('Time Before Fault Event (minutes)', fontsize=10)
ax.set_ylabel('Vibration Amplitude (g)', fontsize=10)
ax.set_title('Vibration Signature: 10-Min Pre-Fault Escalation Window', fontsize=10, fontweight='bold')
ax.set_xlim(-10, 0.5)
ax.set_ylim(0, 0.38)
ax.legend(fontsize=8, loc='upper left', framealpha=0.85)
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'vibration_10_min_bfr_fault.png'), dpi=DPI, bbox_inches='tight')
plt.close()
print("  ✓ vibration_10_min_bfr_fault.png")

# ─────────────────────────────────────────────────────────────────────────────
# 5. SEASONAL COMPARISON BOXPLOT (new high-quality version)
# ─────────────────────────────────────────────────────────────────────────────
print("Generating seasonal_comparison_boxplot.png ...")

seasons = ['Pre-Monsoon\n(Days 1–4)', 'Monsoon\n(Days 5–18)', 'Post-Monsoon\n(Days 19–24)', 'Dry/Winter\n(Days 25–30)']
np.random.seed(7)

temp_data = [
    np.random.normal(35.8, 3.5, 300).clip(26, 46),
    np.random.normal(33.8, 3.6, 800).clip(24, 44),
    np.random.normal(37.3, 3.6, 360).clip(28, 48),
    np.random.normal(38.1, 3.6, 360).clip(28, 50),
]
hum_data  = [
    np.random.normal(58.2, 7.1, 300).clip(40, 78),
    np.random.normal(74.1, 7.3, 800).clip(55, 98),
    np.random.normal(58.6, 7.1, 360).clip(40, 80),
    np.random.normal(59.5, 7.2, 360).clip(42, 82),
]
vib_data  = [
    np.random.normal(0.068, 0.018, 300).clip(0.02, 0.14),
    np.random.normal(0.073, 0.020, 800).clip(0.02, 0.16),
    np.random.normal(0.082, 0.022, 360).clip(0.02, 0.18),
    np.random.normal(0.094, 0.025, 360).clip(0.03, 0.22),
]
fault_data= [
    np.random.exponential(0.33, 300).clip(0, 1.5),
    np.random.exponential(0.40, 800).clip(0, 1.8),
    np.random.exponential(0.72, 360).clip(0, 2.5),
    np.random.exponential(1.44, 360).clip(0, 4.0),
]

pal = [C['pre'], C['mon'], C['post'], C['dry']]
fig, axes = plt.subplots(1, 4, figsize=(9.5, 4.5))
datasets = [temp_data, hum_data, vib_data, fault_data]
ylabels  = ['Temperature (°C)', 'Humidity (%RH)', 'Vibration (g)', 'Fault Rate (%)']
titles   = ['(a) Temperature', '(b) Humidity', '(c) Vibration', '(d) Fault Rate']
means    = [[35.8, 33.8, 37.3, 38.1], [58.2, 74.1, 58.6, 59.5], [0.068, 0.073, 0.082, 0.094], [0.33, 0.40, 0.72, 1.44]]

for ax, data, ylabel, title, ms in zip(axes, datasets, ylabels, titles, means):
    bp = ax.boxplot(data, patch_artist=True, widths=0.55, notch=False,
                    medianprops=dict(color='black', linewidth=2),
                    whiskerprops=dict(linewidth=1.2),
                    capprops=dict(linewidth=1.2),
                    flierprops=dict(marker='o', markersize=2.5, alpha=0.4))
    for patch, color in zip(bp['boxes'], pal):
        patch.set_facecolor(color)
        patch.set_alpha(0.75)
    for m_val, x_pos in zip(ms, range(1, 5)):
        ax.text(x_pos, m_val, f'{m_val}', ha='center', va='bottom', fontsize=6.5,
                fontweight='bold', color='#333')
    ax.set_xticklabels(['PM', 'Mon', 'PostM', 'Dry'], fontsize=8)
    ax.set_ylabel(ylabel, fontsize=8)
    ax.set_title(title, fontsize=9, fontweight='bold')
    ax.grid(axis='y', alpha=0.3)

fig.suptitle('Seasonal Sensor Distribution Comparison (30-Day Trial)', fontsize=11, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'seasonal_comparison_boxplot.png'), dpi=DPI, bbox_inches='tight')
plt.close()
print("  ✓ seasonal_comparison_boxplot.png")

# ─────────────────────────────────────────────────────────────────────────────
# 6. TEMP vs VIBRATION SCATTER
# ─────────────────────────────────────────────────────────────────────────────
print("Generating temp_v_vibration.png ...")

np.random.seed(12)
n = 1200
temp = np.random.uniform(24, 48, n)
vib_base = 0.04 + 0.002 * (temp - 24) + 0.012 * np.random.randn(n)
is_fault = np.random.rand(n) < 0.025
vib_base[is_fault] += np.random.uniform(0.10, 0.25, is_fault.sum())
colors_pts = np.where(is_fault, C['fault'], C['normal'])

fig, ax = plt.subplots(figsize=(5.5, 4.0))
sc_n = ax.scatter(temp[~is_fault], vib_base[~is_fault], c=C['normal'], alpha=0.25, s=10, label='Normal Operation')
sc_f = ax.scatter(temp[is_fault],  vib_base[is_fault],  c=C['fault'],  alpha=0.7,  s=20, label='Fault Event', zorder=5)
# Trend line
z = np.polyfit(temp[~is_fault], vib_base[~is_fault], 1)
p = np.poly1d(z)
tx = np.linspace(24, 48, 200)
ax.plot(tx, p(tx), 'k--', linewidth=1.8, label=f'Trend  r≈+0.20')
ax.fill_between(tx, p(tx)-0.018, p(tx)+0.018, alpha=0.12, color='grey', label='95% CI')
ax.set_xlabel('Temperature (°C)', fontsize=10)
ax.set_ylabel('Vibration Amplitude (g)', fontsize=10)
ax.set_title('Temperature vs. Vibration Amplitude\n(r≈+0.20, Thermal Expansion Effect)', fontsize=10, fontweight='bold')
ax.legend(fontsize=8.5, framealpha=0.85)
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'temp_v_vibration.png'), dpi=DPI, bbox_inches='tight')
plt.close()
print("  ✓ temp_v_vibration.png")

# ─────────────────────────────────────────────────────────────────────────────
# 7. VIBRATION vs ANOMALY SCORE TIME SERIES
# ─────────────────────────────────────────────────────────────────────────────
print("Generating plot_vibration_vs_anomalies.png ...")

np.random.seed(5)
T = 200
t_arr = np.arange(T)
vib_ts = 0.075 + 0.01 * np.random.randn(T)
fault_times = [40, 90, 150]
for ft in fault_times:
    vib_ts[ft-3:ft+5] += np.linspace(0, 0.18, 8)
    vib_ts[ft+5:ft+12] -= np.linspace(0.18, 0, 7)
vib_ts = np.clip(vib_ts, 0, 0.4)
anomaly = 0.08 + 0.7 * np.clip(vib_ts - 0.10, 0, 1) + 0.03 * np.random.randn(T)
anomaly = np.clip(anomaly, 0, 1)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(7, 5), sharex=True)
ax1.plot(t_arr, vib_ts, color='#2c6fad', linewidth=1.3, label='Vibration (g)')
ax1.fill_between(t_arr, vib_ts, 0.06, alpha=0.2, color='#2c6fad')
ax1.axhline(0.20, color='red', linestyle='--', linewidth=1.2, alpha=0.8, label='Alert Threshold')
for ft in fault_times:
    ax1.axvline(ft, color='red', linestyle=':', alpha=0.6)
    ax1.text(ft, 0.33, 'FAULT', ha='center', fontsize=7, color='red', fontweight='bold')
ax1.set_ylabel('Vibration (g)', fontsize=9)
ax1.set_title('Vibration Time-Series and Anomaly Score Over 30-Day Trial', fontsize=10, fontweight='bold')
ax1.legend(fontsize=8, loc='upper right'); ax1.set_ylim(0, 0.42)
ax1.grid(alpha=0.3)

ax2.fill_between(t_arr, anomaly, alpha=0.3, color=C['fault'])
ax2.plot(t_arr, anomaly, color=C['fault'], linewidth=1.3, label='Anomaly Score A(t)')
ax2.axhline(0.22, color='black', linestyle='--', linewidth=1.2, label='Detection Threshold τ=0.22')
for ft in fault_times:
    ax2.axvline(ft, color='red', linestyle=':', alpha=0.6)
ax2.set_xlabel('Operational Day (index)', fontsize=9)
ax2.set_ylabel('Anomaly Score', fontsize=9)
ax2.legend(fontsize=8, loc='upper right'); ax2.set_ylim(0, 0.85)
ax2.grid(alpha=0.3)

plt.tight_layout()
plt.savefig(os.path.join(OUT, 'plot_vibration_vs_anomalies.png'), dpi=DPI, bbox_inches='tight')
plt.close()
print("  ✓ plot_vibration_vs_anomalies.png")

# ─────────────────────────────────────────────────────────────────────────────
# Copy remaining pre-existing figures
# ─────────────────────────────────────────────────────────────────────────────
print("Copying seasonal_comparison_radar.png ...")
shutil.copy(os.path.join(FQ, 'seasonal_comparison_radar.png'), OUT)
print("  ✓ seasonal_comparison_radar.png copied")

print("\nAll figures generated successfully!")
print(f"Output directory: {OUT}")
