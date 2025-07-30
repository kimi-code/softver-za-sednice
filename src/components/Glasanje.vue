<template>
  <div class="card dash-card">
    <div class="card-header dash-card-header bg-danger text-white">Glasanje</div>
    <div class="card-body">
      <div class="mb-3"><b>Tačka na glasanju:</b> Razmatranje budžeta za 2025.</div>
      <div class="d-flex gap-2">
        <button class="btn btn-success">ZA</button>
        <button class="btn btn-danger">PROTIV</button>
        <button class="btn btn-warning">UZDRŽAN</button>
      </div>
      <div class="mt-4">
        <b>Rezultati poslednjeg glasanja:</b>
        <ul class="list-unstyled">
          <li><span class="text-success">ZA:</span> 15</li>
          <li><span class="text-danger">PROTIV:</span> 3</li>
          <li><span class="text-warning">UZDRŽANI:</span> 2</li>
        </ul>
      </div>
    </div>
  </div>
</template>