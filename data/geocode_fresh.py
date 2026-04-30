#!/usr/bin/env python3
"""
Geocodes all TSA deal addresses using Nominatim with Census Bureau API fallback.
Outputs data/deals_raw.json. Run once, then generate deals.ts from the output.
"""
import json, time, urllib.request, urllib.parse

ADDRESSES = [
    {"address": "5425 Drinkard Dr, New Port Richey, FL 34653", "date": "12/22/2022"},
    {"address": "6940 17th St N, St Petersburg, FL 33702", "date": "01/31/2023"},
    {"address": "11205 N Florence Ave, Tampa, FL 33612", "date": "02/28/2023"},
    {"address": "3425 24th Cir, Sarasota, FL 34235", "date": "05/26/2023"},
    {"address": "3815 N 14th St, Tampa, FL 33603", "date": "05/26/2023"},
    {"address": "2506 N Avenida Republica De Cuba, Tampa, FL 33605", "date": "05/19/2023"},
    {"address": "1740 W Powhatan Ave, Tampa, FL 33603", "date": "06/26/2023"},
    {"address": "7950 52nd St N, Pinellas Park, FL 33781", "date": "06/05/2023"},
    {"address": "8606 N Semmes St, Tampa, FL 33604", "date": "08/01/2023"},
    {"address": "429 Burgundy I, Delray Beach, FL 33484", "date": "09/29/2023"},
    {"address": "5311 10th St N, St Petersburg, FL 33703", "date": "10/05/2023"},
    {"address": "6733 81st Ave N, Pinellas Park, FL 33781", "date": "10/26/2023"},
    {"address": "1806 7th Ave W, Bradenton, FL 34205", "date": "11/22/2023"},
    {"address": "3817 Buckeye Cir, Sarasota, FL 34232", "date": "12/20/2023"},
    {"address": "1915 E Ellicott St, Tampa, FL 33610", "date": "12/07/2023"},
    {"address": "1004 27th Ave W, Bradenton, FL 34205", "date": "01/17/2024"},
    {"address": "3616 Lindell Ave, Tampa, FL 33610", "date": "01/30/2024"},
    {"address": "4151 Oakfield Ave, Holiday, FL 34691", "date": "02/08/2024"},
    {"address": "6108 Oak Ridge Ave, New Port Richey, FL 34653", "date": "03/22/2024"},
    {"address": "4004 36th Avenue Dr W, Bradenton, FL 34205", "date": "03/01/2024"},
    {"address": "3008 Newtown Blvd, Sarasota, FL 34234", "date": "03/14/2024"},
    {"address": "5410 Jersey Ave S, Gulfport, FL 33707", "date": "04/26/2024"},
    {"address": "1205 29th St W, Bradenton, FL 34205", "date": "04/22/2024"},
    {"address": "3910 W Iowa Ave, Tampa, FL 33616", "date": "05/22/2024"},
    {"address": "811 27th Street Court East, Bradenton, FL 34208", "date": "05/28/2024"},
    {"address": "149 Caddy Rd, Rotonda West, FL 33947", "date": "05/01/2024"},
    {"address": "4800 Turnberry Cir, North Port, FL 34288", "date": "05/03/2024"},
    {"address": "462 NE 71st Ter, Ocala, FL 34470", "date": "07/22/2024"},
    {"address": "6941 Dalkeith Ave N, Saint Petersburg, FL 33709", "date": "07/24/2024"},
    {"address": "112 E Emily St, Tampa, FL 33603", "date": "07/31/2024"},
    {"address": "3145 Kingston St, Port Charlotte, FL 33952", "date": "08/07/2024"},
    {"address": "1400 Lakeview Rd, Clearwater, FL 33756", "date": "08/28/2024"},
    {"address": "101 Williams Ditch Rd, Cantonment, FL 32533", "date": "09/12/2024"},
    {"address": "6343 Talbot St, North Port, FL 34287", "date": "01/10/2025"},
    {"address": "2100 Auburn St S, St Petersburg, FL 33712", "date": "01/14/2025"},
    {"address": "7377 Royal Palm Dr, New Port Richey, FL 34652", "date": "01/31/2025"},
    {"address": "16214 2nd St E, Redington Beach, FL 33708", "date": "02/14/2025"},
    {"address": "3430 Chapel Dr, Sarasota, FL 34234", "date": "02/13/2025"},
    {"address": "803 W Woodlawn Ave, Tampa, FL 33603", "date": "02/28/2025"},
    {"address": "8701 Gulf Blvd, St Pete Beach, FL 33706", "date": "03/07/2025"},
    {"address": "5745 4th Ave N, St Petersburg, FL 33710", "date": "03/07/2025"},
    {"address": "2115 W Saint John St, Tampa, FL 33607", "date": "03/07/2025"},
    {"address": "6572 Mauna Loa Blvd, Sarasota, FL 34241", "date": "03/13/2025"},
    {"address": "3011 W Spruce St, Tampa, FL 33607", "date": "03/14/2025"},
    {"address": "1213 W Camellia Dr, Brandon, FL 33510", "date": "03/21/2025"},
    {"address": "905 Hart St, Clearwater, FL 33755", "date": "03/27/2025"},
    {"address": "4041 52nd Ave N, Saint Petersburg, FL 33714", "date": "03/28/2025"},
    {"address": "2401 16th Ave N, Saint Petersburg, FL 33713", "date": "04/01/2025"},
    {"address": "7013 Symmes Rd, Gibsonton, FL 33534", "date": "04/01/2025"},
    {"address": "9948 Skewlee Rd, Thonotosassa, FL 33592", "date": "04/11/2025"},
    {"address": "1004 E 28th Ave, Tampa, FL 33605", "date": "04/29/2025"},
    {"address": "5175 23rd Ave N, St Petersburg, FL 33710", "date": "05/02/2025"},
    {"address": "5720 79th Ave N, Pinellas Park, FL 33781", "date": "05/21/2025"},
    {"address": "8052 Gabriel Dr, Port Richey, FL 34668", "date": "05/22/2025"},
    {"address": "2220 Davis St, Tampa, FL 33605", "date": "05/23/2025"},
    {"address": "4107 W Fielder St, Tampa, FL 33611", "date": "06/03/2025"},
    {"address": "4630 W Euclid Ave, Tampa, FL 33629", "date": "06/11/2025"},
    {"address": "7441 San Moritz Dr, Port Richey, FL 34668", "date": "06/12/2025"},
    {"address": "2505 Hollis Dr, Tampa, FL 33618", "date": "06/19/2025"},
    {"address": "111 Orangeview Ave, Clearwater, FL 33755", "date": "07/07/2025"},
    {"address": "4719 W Wyoming Ave, Tampa, FL 33616", "date": "07/10/2025"},
    {"address": "13097 120th St, Largo, FL 33778", "date": "07/10/2025"},
    {"address": "601 Park Blvd, Oldsmar, FL 34677", "date": "07/16/2025"},
    {"address": "10418 N Oklawaha Ave, Tampa, FL 33617", "date": "08/08/2025"},
    {"address": "16103 4th St E, Redington Beach, FL 33708", "date": "08/08/2025"},
    {"address": "1607 Stevensons Dr, Clearwater, FL 33755", "date": "08/12/2025"},
    {"address": "1602 3rd Ave W, Palmetto, FL 34221", "date": "08/20/2025"},
    {"address": "12760 118th St, Seminole, FL 33778", "date": "09/08/2025"},
    {"address": "8717 91st Ter, Seminole, FL 33777", "date": "09/16/2025"},
    {"address": "124 Magnolia Ave, Seffner, FL 33584", "date": "09/17/2025"},
    {"address": "300 83rd Ave NE, Saint Petersburg, FL 33702", "date": "09/30/2025"},
    {"address": "7504 S Germer St, Tampa, FL 33616", "date": "09/30/2025"},
    {"address": "4946 Dr Martin Luther King Jr St S, St Petersburg, FL 33705", "date": "10/03/2025"},
    {"address": "5170 Flamingo Dr, Saint Petersburg, FL 33714", "date": "10/03/2025"},
    {"address": "4111 W Marietta St, Tampa, FL 33616", "date": "10/06/2025"},
    {"address": "6544 S West Shore Cir, Tampa, FL 33616", "date": "10/14/2025"},
    {"address": "335 80th Ave NE, Saint Petersburg, FL 33702", "date": "10/15/2025"},
    {"address": "1925 Forked Creek Dr, Englewood, FL 34223", "date": "10/17/2025"},
    {"address": "2309 21st Ave W, Bradenton, FL 34205", "date": "11/12/2025"},
    {"address": "2415 25th Ave W, Bradenton, FL 34205", "date": "01/09/2026"},
    {"address": "2303 N 47th St, Tampa, FL 33605", "date": "01/16/2026"},
    {"address": "1806 E Linda St, Plant City, FL 33563", "date": "02/06/2026"},
    {"address": "3604 E Lambright St, Tampa, FL 33610", "date": "02/06/2026"},
    {"address": "7735 Brookridge Dr, Port Richey, FL 34668", "date": "02/10/2026"},
    {"address": "701 Westwood Ln, Brandon, FL 33511", "date": "02/19/2026"},
    {"address": "3817 Temple St, Tampa, FL 33619", "date": "02/25/2026", "count": 2},
    {"address": "1609 Council Dr, Sun City Center, FL 33573", "date": "02/27/2026"},
    {"address": "431 Rafael Blvd NE, Saint Petersburg, FL 33704", "date": "03/05/2026"},
    {"address": "5905 N Cherokee Ave, Tampa, FL 33604", "date": "03/13/2026"},
    {"address": "1001 Carlton St, Clearwater, FL 33755", "date": "03/13/2026"},
    {"address": "1621 N Washington Ave, Clearwater, FL 33755", "date": "03/26/2026"},
    {"address": "27215 Punta Cabello Ct, Punta Gorda, FL 33983", "date": "03/27/2026"},
    {"address": "402 E Damon St, Plant City, FL 33563", "date": "04/10/2026"},
    {"address": "6941 SE 110th St, Belleview, FL 34420", "date": "04/13/2026", "count": 2},
    {"address": "4425 18th Ave S, St Petersburg, FL 33711", "date": "04/17/2026"},
    {"address": "3307 Hickman Ave, Plant City, FL 33563", "date": "04/21/2026"},
]

def geocode_nominatim(address):
    q = urllib.parse.urlencode({"q": address, "format": "json", "limit": 1})
    url = f"https://nominatim.openstreetmap.org/search?{q}"
    req = urllib.request.Request(url, headers={"User-Agent": "TSA-Geocoder/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
            if data:
                return float(data[0]["lat"]), float(data[0]["lon"])
    except Exception as e:
        print(f"  Nominatim error: {e}")
    return None, None

def geocode_census(address):
    q = urllib.parse.urlencode({"address": address, "benchmark": "Public_AR_Current", "format": "json"})
    url = f"https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?{q}"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            data = json.loads(r.read())
            matches = data.get("result", {}).get("addressMatches", [])
            if matches:
                coords = matches[0]["coordinates"]
                return float(coords["y"]), float(coords["x"])
    except Exception as e:
        print(f"  Census error: {e}")
    return None, None

results = []
for i, item in enumerate(ADDRESSES):
    addr = item["address"]
    print(f"[{i+1}/{len(ADDRESSES)}] {addr}")
    lat, lng = geocode_nominatim(addr)
    time.sleep(1.1)
    if not lat:
        print("  -> Nominatim failed, trying Census...")
        lat, lng = geocode_census(addr)
        time.sleep(0.5)
    if lat:
        print(f"  -> {lat:.5f}, {lng:.5f}")
    else:
        print(f"  -> FAILED — manual fix needed")
    result = {**item, "lat": lat, "lng": lng}
    results.append(result)

with open("/Users/seancastro/top-shelf-next/data/deals_raw.json", "w") as f:
    json.dump(results, f, indent=2)

failed = [r for r in results if not r["lat"]]
print(f"\nDone. {len(results) - len(failed)}/{len(results)} geocoded.")
if failed:
    print("FAILED:")
    for r in failed:
        print(f"  {r['address']}")
