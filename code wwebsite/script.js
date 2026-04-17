// Expanded Mock Data so you can test scrolling
let listings = [
  {
    title: "Prime Corner Lot in City Center",
    sellerName: "Juan Dela Cruz",
    sellerNumber: "+63 912 345 6789",
    location: "Davao City, Mindanao",
    price: "₱1,200,000",
    area: "500 sqm",
    commission: "₱12,000",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1629016943072-0bf0ce4e2608?w=400&h=600&fit=crop"
    ]
  },
  {
    title: "Beachfront Property",
    sellerName: "Maria Santos",
    sellerNumber: "+63 998 765 4321",
    location: "Samal Island",
    price: "₱3,500,000",
    area: "1,200 sqm",
    commission: "₱35,000",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520167115858-ebafb9739dd9?w=400&h=600&fit=crop"
    ]
  },
  {
    title: "Agricultural Land",
    sellerName: "Pedro Penduko",
    sellerNumber: "+63 922 111 2222",
    location: "Bukidnon",
    price: "₱800,000",
    area: "5,000 sqm",
    commission: "₱8,000",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=600&fit=crop"
    ]
  }
];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderListings();
});

// Navigation Toggle
function switchTab(tab) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  if (tab === 'buyer') {
    document.getElementById('buyerView').classList.add('active');
    document.getElementById('navBuyer').classList.add('active');
    renderListings(); // Re-render in case a new one was added
  } else {
    document.getElementById('sellerView').classList.add('active');
    document.getElementById('navSeller').classList.add('active');
  }
}

// Render ALL listings in a scrollable feed
function renderListings() {
  const displayArea = document.getElementById("listingDisplay");
  const emptyState = document.getElementById("emptyState");

  if (listings.length === 0) {
    displayArea.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  let feedHTML = "";

  // Loop backward so newest listings appear at the top
  for (let i = listings.length - 1; i >= 0; i--) {
    const item = listings[i];

    // Build the horizontal image gallery for this specific listing
    let imagesHTML = "";
    item.images.forEach(img => {
      imagesHTML += `<img src="${img}" class="gallery-img">`;
    });

    feedHTML += `
      <div class="listing-card" id="listing-${i}">
        <div class="app-header">
          <img src="${item.images[0]}" class="app-icon" alt="Lot Icon">
          <div class="app-titles">
            <h1>${item.title}</h1>
            <p>${item.sellerName} • ${item.sellerNumber}</p>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat-item">
            <h3>${item.price}</h3>
            <p>Price</p>
          </div>
          <div class="divider"></div>
          <div class="stat-item">
            <h3>${item.area}</h3>
            <p>Area Size</p>
          </div>
          <div class="divider"></div>
          <div class="stat-item">
            <h3>${item.commission}</h3>
            <p>1% Comm.</p>
          </div>
        </div>

        <button class="primary-btn" onclick="messageSeller('${item.sellerName}', '${item.sellerNumber}')">
          Message Seller (Web/FB)
        </button>
        
        <div class="action-row">
          <button class="action-btn pass" onclick="removeListing(${i})">Hide ❌</button>
          <button class="action-btn accept" onclick="saveListing('${item.title}')">Save ✅</button>
        </div>

        <div class="gallery-scroll">
          ${imagesHTML}
        </div>

        <div class="about-section">
          <h2>About this lot <span>→</span></h2>
          <p><strong>Location:</strong> ${item.location || 'Not specified'}<br><br>
          Your go-to investment opportunity. Connect directly with the seller to negotiate or finalize the deal. A 1% platform commission applies upon successful transfer.</p>
        </div>
      </div>
    `;
  }

  displayArea.innerHTML = feedHTML;
}

// Buyer Actions
function removeListing(index) {
  // Visually remove it from the feed without deleting the data permanently (acts like a "Pass")
  document.getElementById(`listing-${index}`).style.display = 'none';
}

function saveListing(title) {
  alert(`You saved "${title}" to your favorites!`);
}

function messageSeller(name, number) {
  alert(`Opening chat with ${name} (${number})...\n(This would link to Messenger or Internal Chat)`);
}

// Seller Feature: Auto-calculate 1% commission
function calculateCommission() {
  const priceInput = document.getElementById("lotPrice").value;
  const commInput = document.getElementById("lotCommission");
  
  if (priceInput && !isNaN(priceInput)) {
    const comm = parseFloat(priceInput) * 0.01;
    commInput.value = "₱" + comm.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    commInput.value = "₱0.00";
  }
}

// Add New Listing
function submitListing() {
  const title = document.getElementById("lotTitle").value;
  const sellerName = document.getElementById("sellerName").value;
  const sellerNumber = document.getElementById("sellerNumber").value;
  const location = document.getElementById("lotLocation").value;
  const price = document.getElementById("lotPrice").value;
  const area = document.getElementById("lotArea").value;
  const imageInput = document.getElementById("lotImages");
  const errorText = document.getElementById("imageCount");

  // Validations
  if (!title || !sellerName || !price || !area || !sellerNumber) {
    alert("Please fill in all required fields.");
    return;
  }

  const fileCount = imageInput.files.length;
  if (fileCount < 4 || fileCount > 10) {
    errorText.innerText = `You selected ${fileCount} images. Please attach between 4 and 10 images.`;
    return;
  }
  errorText.innerText = "";

  // Process Images (Mock reading them via File API)
  let base64Images = [];
  let filesProcessed = 0;

  for (let i = 0; i < fileCount; i++) {
    let reader = new FileReader();
    reader.onload = function(e) {
      base64Images.push(e.target.result);
      filesProcessed++;
      
      // Once all images are read, save the listing
      if (filesProcessed === fileCount) {
        saveListingToData(title, sellerName, sellerNumber, location, price, area, base64Images);
      }
    };
    reader.readAsDataURL(imageInput.files[i]);
  }
}

function saveListingToData(title, sellerName, sellerNumber, location, price, area, imagesArray) {
  const formattedPrice = "₱" + parseFloat(price).toLocaleString();
  const calculatedCommission = "₱" + (parseFloat(price) * 0.01).toLocaleString();

  listings.push({
    title: title,
    sellerName: sellerName,
    sellerNumber: sellerNumber,
    location: location,
    price: formattedPrice,
    area: area + " sqm",
    commission: calculatedCommission,
    images: imagesArray
  });

  alert("Listing added successfully! You agreed to the 1% commission rule.");
  
  // Clear form
  document.getElementById("lotTitle").value = "";
  document.getElementById("sellerName").value = "";
  document.getElementById("sellerNumber").value = "";
  document.getElementById("lotLocation").value = "";
  document.getElementById("lotPrice").value = "";
  document.getElementById("lotArea").value = "";
  document.getElementById("lotCommission").value = "";
  document.getElementById("lotImages").value = "";

  // Go back to Buyer tab to view it (it will appear at the top)
  switchTab('buyer');
}