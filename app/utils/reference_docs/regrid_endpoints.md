<h1>Regrid API Endpoints</h1>
        
        
        
<p>Our API has several unique endpoints, each serving a purpose of querying against our vast parcel dataset to look up parcel records that best serve your location intelligence use cases.</p>

<p>Finding the parcel records you need can be achieved in many ways. In this article we describe each endpoint in detail. A special emphasis is on input parameters, input value types and output formats.</p>

<p>Remember, if you want to try our API now, you can always head over to the <a href="section/interactive-api-sandbox">API Sandbox</a>.</p>

<h2 id="parcels-by-country">Parcels by Country</h2>

<p>The Regrid International API is quite similar to our original US Parcel API. <a href="/api/international-api">Learn about the differences</a> when working with other countries.</p>

<h2 id="parcels">Parcels</h2>

<p>There are many ways to find the parcel record or records you are interested in.</p>

<p>Each JSON endpoint begins with <code class="language-plaintext highlighter-rouge">https://app.regrid.com/api/v2/&lt;Country Code&gt;</code> and continues with…</p>

<h3 id="point">Point</h3>
<p><strong>Latitude and Longitude a.k.a. Reverse Geocoding</strong></p>

<p><code class="language-plaintext highlighter-rouge">api/v2/parcels/point</code></p>

<p>This endpoint delivers parcel records using latitude and longitude points. You can add a <code class="language-plaintext highlighter-rouge">radius</code> zone to the point or
points and <code class="language-plaintext highlighter-rouge">limit</code> the amount of parcel records returned in the response. The parameter <code class="language-plaintext highlighter-rouge">geojson</code> takes priority if <code class="language-plaintext highlighter-rouge">lat</code> and <code class="language-plaintext highlighter-rouge">lon</code> are used in the same request.</p>

<p>This endpoint has all the same parameters as <a href="#query-by-fields-us"><code class="language-plaintext highlighter-rouge">api/v2/parcels/query</code></a>, but limited to no <code class="language-plaintext highlighter-rouge">fields</code> param and only Point or MultiPoint GeoJSON types.</p>

<p>Tip:<br>
When using an exact point, sometimes it will fall outside a parcel boundary. If a parcel is very close to a point, using the <code class="language-plaintext highlighter-rouge">radius</code> parameter can help by creating a circular polygon around each point. Using a small radius on points is also helpful when some tools return points on parcel records that are literally in a street next to the parcel.</p>

<p><strong>HTTP API request general form</strong></p>

<p><code class="language-plaintext highlighter-rouge">GET /api/v2/parcels/point?lat=&lt;y&gt;&amp;lon=&lt;x&gt;&amp;token=&lt;token&gt;</code></p>

<p><strong>Query parameters</strong></p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">lat</code>: Latitude point</li>
  <li><code class="language-plaintext highlighter-rouge">lon</code>: Longitude point</li>
  <li><code class="language-plaintext highlighter-rouge">radius</code>: (Default: 0, Maximum: 32000) Radius in meters for which all Parcel records will be returned if they are within the radius zone from latitude and longitude point.</li>
  <li>
    <p><code class="language-plaintext highlighter-rouge">geojson</code>: Geographic data structure for Point and MultiPoint only. This parameter takes priority if <code class="language-plaintext highlighter-rouge">lat</code>/<code class="language-plaintext highlighter-rouge">lon</code> are used in the same request.</p>
  </li>
  <li><code class="language-plaintext highlighter-rouge">offset_id</code>: ID from a previous query exceeding the limit, returns the next set of results up to limit.</li>
  <li><code class="language-plaintext highlighter-rouge">limit</code>: (optional) Default 20. Maximum number of Parcel Records to return. Max is 1000.</li>
  <li><code class="language-plaintext highlighter-rouge">return_count</code>: Set to true to enable count of parcels in query.</li>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code>: Default true. Features are returned without geometry values. This reduces the payload size significantly if only field data is required.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">parcels</code>: A <a href="https://geojson.org" target="_blank">GeoJSON</a> Features Collection of Features, each containing the matched Parcel Records. An empty Feature Collection with no error means no Parcel Records could be matched.</li>
</ul>

<p><strong>Example US API request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/parcels/point?lat=42.36511&amp;lon=-83.073107&amp;radius=250&amp;token=&lt;token&gt;
</code></pre></div></div>

<details>
<summary><strong>Example US results:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">{</span><span class="w">
                </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
                </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                        </span><span class="p">[</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0734727315047</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3651818518358</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0732453652113</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3647767765094</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0725988503963</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.364985221084</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0728299168503</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3653894282331</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0733713700996</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3652143873895</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0734727315047</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3651818518358</span><span class="w">
                            </span><span class="p">]</span><span class="w">
                        </span><span class="p">]</span><span class="w">
                    </span><span class="p">]</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 Burroughs St"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02001069-71"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb_no_formatting"</span><span class="p">:</span><span class="w"> </span><span class="s2">"0200106971"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22320"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"OFFICE BLDG-3 STORIES OR MORE"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Special Development District Mixed Use"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="mi">1926</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office Buildings"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ASSESSED"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"TECHONE DEVELOPMENT LLC"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS ST"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"homestead_exemption"</span><span class="p">:</span><span class="w"> </span><span class="s2">"0"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_address_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">44</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">28713</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"V"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DNNNY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AAN105"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"H"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12.2,14.7,15.1,A1"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-01-04"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="mf">2300.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="mf">2100.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office or bank building"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="mf">6000.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Developed site with buildings"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone"</span><span class="p">:</span><span class="w"> </span><span class="s2">"X"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_subtype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AREA OF MINIMAL FLOOD HAZARD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"[{</span><span class="se">\"</span><span class="s2">zone</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">X</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">subtype</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">AREA OF MINIMAL FLOOD HAZARD</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">percent</span><span class="se">\"</span><span class="s2">:100}]"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_data_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-10-17"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_unified_school_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit Public Schools Community District"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Planned"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_subtype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Planned"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_code_link"</span><span class="p">:</span><span class="w"> </span><span class="s2">"https://www.zoneomics.com/code/detroit-MI/chapter_11/#SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"10070643"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"BURROUGHS"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ST"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"{</span><span class="se">\"</span><span class="s2">address</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">440 BURROUGHS</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">szip</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2"> </span><span class="se">\"</span><span class="s2">}"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"detroit"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"wayne"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202-3429"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip5"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county,census_places;cass"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N BURROUGHS 10-11 BLK 12--CASS FARM CO LTD SUB L19 P35 PLATS, W C R 2/27 37-38 &amp; S 1/2 OF VAC ALLEY ADJ MANDLEBAUMS SUB L2 P8 PLATS, W C R 2/62 189.53 IRREG"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"42.365083"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-83.073037"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Yes"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163518900"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163533900"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339004021"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339004"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_zcta"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-01-31"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="mi">142125</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.697</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="mf">30365.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.69741</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">30380</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"preserved"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-02-06 13:03:55 -0500"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_zoning_backup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_zoning_description_backup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Special Development District Mixed Use"</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="w">
            </span><span class="p">}</span><span class="w">
        </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">

  </span></code></pre></figure>


</details>

<p><br></p>

<p><strong>Example CA API request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/parcels/point?lat=49.819318661797126&amp;lon=-97.13621073038664&amp;radius=250&amp;token=&lt;token&gt;
</code></pre></div></div>
<details>
<summary><strong>Example CA results:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">{</span><span class="w">
                </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
                </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                        </span><span class="p">[</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137085</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819182</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137085</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.81918</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137085</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8191785</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370715</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8190085</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137058</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.818836</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370495</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8187275</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137051</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.818699</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370535</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8186445</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137062</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.818476</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370635</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.818451</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1368875</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8185115</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.136726</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8185675</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1365315</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.818635</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1363225</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.818707</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1359615</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.818832</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.135758</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8189025</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1352595</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819075</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1354815</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819242</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.135925</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819575</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1361735</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819762</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.136973</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8194855</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137151</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819424</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.13715</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819422</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137149</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.81942</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137148</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819418</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1371475</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819416</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1371465</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819414</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1371455</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819412</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1371305</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819376</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137117</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819339</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137106</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8193015</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370975</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819264</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370905</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8192265</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137086</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8191885</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370855</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819187</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370855</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819185</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.1370855</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.8191835</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-97.137085</span><span class="p">,</span><span class="w">
                                </span><span class="mf">49.819182</span><span class="w">
                            </span><span class="p">]</span><span class="w">
                        </span><span class="p">]</span><span class="w">
                    </span><span class="p">]</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"330 River Road"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/ca/mb/division-no-11/winnipeg/52941"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">52941</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"admin0"</span><span class="p">:</span><span class="w"> </span><span class="s2">"CA"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"4611"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"8004749100"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb_no_formatting"</span><span class="p">:</span><span class="w"> </span><span class="s2">"8004749100"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PIEMA - MUSEUM/ART GALLERY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"R1M - RES - S F - MEDIUM"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ASSESSED"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mf">1966000.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"taxyear"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"330 RIVER ROAD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"330"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"RIVER"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ROAD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"{</span><span class="se">\"</span><span class="s2">address</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">330 RIVER ROAD</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">saddno</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">330</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">saddstr</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">RIVER</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">saddsttyp</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">ROAD</span><span class="se">\"</span><span class="s2">}"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"admin1"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MB"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"admin2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Division No. 11"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"admin2_slug"</span><span class="p">:</span><span class="w"> </span><span class="s2">"division-no-11"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"admin3"</span><span class="p">:</span><span class="w"> </span><span class="s2">"WINNIPEG"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"admin3_slug"</span><span class="p">:</span><span class="w"> </span><span class="s2">"winnipeg"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"neighborhood"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MINNETONKA"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"49.819141"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-97.136371"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-10-15"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"sourceurl"</span><span class="p">:</span><span class="w"> </span><span class="s2">"http://www.winnipegassessment.com/asmtpub/english/propertydetails/CommercialDetails.aspx?pgLang=EN&amp;isRealtySearch=true&amp;RollNumber=08004749100"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gissqm"</span><span class="p">:</span><span class="w"> </span><span class="mf">10913.81275</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">2.6968</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">117475</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/ca/mb/division-no-11/winnipeg/52941"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"d6d09210-c3cf-4947-a4f7-8e1a78fee65e"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-10-15 09:35:50 -0400"</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"score"</span><span class="p">:</span><span class="w"> </span><span class="mf">100.0</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"d6d09210-c3cf-4947-a4f7-8e1a78fee65e"</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">52941</span><span class="w">
            </span><span class="p">}</span><span class="w">
        </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
  </span></code></pre></figure>


</details>

<hr>

<h3 id="address">Address</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/address</code></strong></p>

<p>This endpoint delivers parcel records using an address. 
Within the United States and Puerto Rico, there can be multiple locations
with similar addresses, and therefore we suggest specifying the location within a State,
County and/or City by using the <code class="language-plaintext highlighter-rouge">path</code> parameter.</p>

<p>For international requests, use the <code class="language-plaintext highlighter-rouge">path</code> paramater for the country's equivalent juristictions as <code class="language-plaintext highlighter-rouge">admin1</code>, <code class="language-plaintext highlighter-rouge">admin2</code> and/or <code class="language-plaintext highlighter-rouge">admin3</code>.</p>

<p><strong>HTTP API request general form</strong></p>

<p><code class="language-plaintext highlighter-rouge">GET /api/v2/parcels/address?query=&lt;address&gt;&amp;path=&lt;path&gt;&amp;token=&lt;token&gt;</code></p>

<p><strong>Query parameters</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li>
    <p><code class="language-plaintext highlighter-rouge">query</code>: A street address or partial address, starting at the beginning</p>
  </li>
  <li><code class="language-plaintext highlighter-rouge">path</code>: Represents the path for the '/us/state_id/county_slug' as defined by the Regrid Standard Schema. This restricts the search to this area.</li>
  <li><code class="language-plaintext highlighter-rouge">limit</code>: (optional) Default 20. Maximum number of Parcel Records to return. Max is 1000.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">parcels</code>: A <a href="https://geojson.org" target="_blank">GeoJSON</a> Features Collection of Features, sorted by descending relevance rank, containing the matched Parcel Records. An empty results set with no error means no Parcel Records could be matched.</li>
</ul>

<p><strong>Example request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/parcels/address?query=440%20burroughs&amp;path=/us/mi/wayne/detroit&amp;limit=15&amp;token=&lt;token&gt;
</code></pre></div></div>

<details>
<summary><strong>Example results:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">{</span><span class="w">
                </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
                </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                        </span><span class="p">[</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0734727315047</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3651818518358</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0732453652113</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3647767765094</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0725988503963</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.364985221084</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0728299168503</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3653894282331</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0733713700996</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3652143873895</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0734727315047</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3651818518358</span><span class="w">
                            </span><span class="p">]</span><span class="w">
                        </span><span class="p">]</span><span class="w">
                    </span><span class="p">]</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 Burroughs St"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02001069-71"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb_no_formatting"</span><span class="p">:</span><span class="w"> </span><span class="s2">"0200106971"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22320"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"OFFICE BLDG-3 STORIES OR MORE"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Special Development District Mixed Use"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="mi">1926</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office Buildings"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ASSESSED"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"TECHONE DEVELOPMENT LLC"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS ST"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"homestead_exemption"</span><span class="p">:</span><span class="w"> </span><span class="s2">"0"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_address_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">44</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">28713</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"V"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DNNNY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AAN105"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"H"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12.2,14.7,15.1,A1"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-01-04"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="mf">2300.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="mf">2100.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office or bank building"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="mf">6000.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Developed site with buildings"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone"</span><span class="p">:</span><span class="w"> </span><span class="s2">"X"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_subtype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AREA OF MINIMAL FLOOD HAZARD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"[{</span><span class="se">\"</span><span class="s2">zone</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">X</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">subtype</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">AREA OF MINIMAL FLOOD HAZARD</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">percent</span><span class="se">\"</span><span class="s2">:100}]"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_data_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-10-17"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_unified_school_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit Public Schools Community District"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Planned"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_subtype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Planned"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_code_link"</span><span class="p">:</span><span class="w"> </span><span class="s2">"https://www.zoneomics.com/code/detroit-MI/chapter_11/#SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"10070643"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"BURROUGHS"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ST"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"{</span><span class="se">\"</span><span class="s2">address</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">440 BURROUGHS</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">szip</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2"> </span><span class="se">\"</span><span class="s2">}"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"detroit"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"wayne"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202-3429"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip5"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county,census_places;cass"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N BURROUGHS 10-11 BLK 12--CASS FARM CO LTD SUB L19 P35 PLATS, W C R 2/27 37-38 &amp; S 1/2 OF VAC ALLEY ADJ MANDLEBAUMS SUB L2 P8 PLATS, W C R 2/62 189.53 IRREG"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"42.365083"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-83.073037"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Yes"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163518900"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163533900"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339004021"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339004"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_zcta"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-01-31"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="mi">142125</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.697</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="mf">30365.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.69741</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">30380</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"preserved"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-02-06 13:03:55 -0500"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_zoning_backup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_zoning_description_backup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Special Development District Mixed Use"</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"score"</span><span class="p">:</span><span class="w"> </span><span class="mf">92.0</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="w">
            </span><span class="p">}</span><span class="w">
        </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">

  </span></code></pre></figure>


</details>

<hr>

<h3 id="assessor-parcel-number">Assessor Parcel Number</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/apn</code></strong></p>

<p>This endpoint delivers parcel records using the Assessor Parcel Number (APN) which is assigned to each parcel by the respective county.
Multiple parcel records can be returned depending on the APN, therefore specify the location within a State, County and/or City (for international requests <code class="language-plaintext highlighter-rouge">admin1</code>, <code class="language-plaintext highlighter-rouge">admin2</code> and/or <code class="language-plaintext highlighter-rouge">admin3</code>) by using the parameter <code class="language-plaintext highlighter-rouge">path</code>.</p>

<p>An APN is also known as a Parcel Identification Number (PIN).</p>

<p><strong>HTTP API request general form</strong></p>

<p><code class="language-plaintext highlighter-rouge">GET /api/v2/parcels/apn?parcelnumb=&lt;pin&gt;&amp;token=&lt;token&gt;</code></p>

<p><strong>Query parameters</strong></p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">parcelnumb</code>: (required) The assessor's parcel number to look up. Non-alphanumeric characters will be removed when searching. Example: '26447580030140000'</li>
  <li><code class="language-plaintext highlighter-rouge">path</code>: Represents the path for the '/us/state_id/county_slug' as defined by the Regrid Standard Schema. This restricts the search to this area.</li>
  <li><code class="language-plaintext highlighter-rouge">limit</code>: (optional) Default 20. Maximum number of Parcel Records to return. Max is 1000.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">parcels</code>: A <a href="https://geojson.org" target="_blank">GeoJSON</a> Features Collection of Features, sorted by descending relevance rank, containing the matched Parcel Records. An empty results set with no error means no Parcel Records could be matched.</li>
</ul>

<p><strong>Example request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/parcels/apn?parcelnumb=02001069-71&amp;path=/us/mi/wayne/detroit&amp;&amp;limit=15&amp;token=&lt;token&gt;
</code></pre></div></div>

<details>
<summary><strong>Example results:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">{</span><span class="w">
                </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
                </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                        </span><span class="p">[</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.767615998928</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5816236366833</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.767318572024</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5816239628792</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.765029173062</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5816271051581</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.763865736208</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5816287432331</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.762378718872</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5816307559546</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.763103506888</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5824514021095</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.763331741628</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835057303128</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.763328520668</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835917593713</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766361316984</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835790531468</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766368466386</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835704780216</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766376524311</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835621443849</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.76638515297</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835542188674</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766394465888</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835467282259</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766404462757</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835396450268</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766414917452</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835329980565</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766425943812</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835268415054</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766437541525</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835211479399</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.76644948602</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835160833141</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766461888653</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835114823502</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766474751596</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835075370826</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766487732717</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835040300732</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766501174768</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835012336269</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.76651473655</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5834990126062</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766528418682</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5834974218781</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766542333142</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5834963510316</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766556255357</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5834959660214</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766570071182</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5834961852237</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.76658400798</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5834970895854</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766597837456</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5834985158591</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766611447637</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835005744556</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766624838833</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835032928086</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.766637896586</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5835065618609</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-110.767615998928</span><span class="p">,</span><span class="w">
                                </span><span class="mf">43.5816236366833</span><span class="w">
                            </span><span class="p">]</span><span class="w">
                        </span><span class="p">]</span><span class="w">
                    </span><span class="p">]</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"7085 Ryegrass Road"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/wy/teton/jackson-hole/348363"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">348363</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"56039"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22-42-16-21-4-02-001"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb_no_formatting"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22421621402001"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"tax_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02-001069"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"alt_parcelnumb1"</span><span class="p">:</span><span class="w"> </span><span class="s2">"R0009806"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"alt_parcelnumb2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02-001069"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Res Vacant Land"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="kc">false</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"TOTAL"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"landval"</span><span class="p">:</span><span class="w"> </span><span class="mf">4068000.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mf">4068000.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"taxyear"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2022"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"7085 RYEGRASS ROAD LLC"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PO BOX 8785"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"WY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"WY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"83002-8785"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"7085 RYEGRASS ROAD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_address_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">6527</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">3</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cdl_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"[[152, 91.6], [121, 8.4]]"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cdl_majority_category"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Shrubland"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cdl_majority_percent"</span><span class="p">:</span><span class="w"> </span><span class="mf">91.6</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cdl_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2022"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"A1"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"3.1,14.1,A1"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-01-04"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="mf">1900.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Residential vacant land"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="mf">1000.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Site in natural state"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone"</span><span class="p">:</span><span class="w"> </span><span class="s2">"X"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_subtype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AREA OF MINIMAL FLOOD HAZARD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"[{</span><span class="se">\"</span><span class="s2">zone</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">X</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">subtype</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">AREA OF MINIMAL FLOOD HAZARD</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">percent</span><span class="se">\"</span><span class="s2">:100}]"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_data_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-10-17"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_unified_school_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Teton County School District 1"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"7085"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"RYEGRASS RD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"JACKSON"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"{</span><span class="se">\"</span><span class="s2">address</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">7085 RYEGRASS ROAD</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">saddno</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">7085</span><span class="se">\"</span><span class="s2">}"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"jackson-hole"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"teton"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"WY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"83001"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip5"</span><span class="p">:</span><span class="w"> </span><span class="s2">"83001"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county;cass"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LOT 9, BAR-B-BAR MEADOWS SUBDIVISION"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lot"</span><span class="p">:</span><span class="w"> </span><span class="s2">"9"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"43.582527"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-110.765062"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"No"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"56039967602"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"560399676023008"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"560399676023"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_zcta"</span><span class="p">:</span><span class="w"> </span><span class="s2">"83001"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-01-31"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">17.7003317576621</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">17.6816</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">770227</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/wy/teton/jackson-hole/348363"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"preserved"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6d43a087-e6d0-4b56-ac16-9d61f5bc8337"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-01-22 08:21:35 -0500"</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Jackson Hole, WY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Jackson Hole, WY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/wy/teton/jackson-hole"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6d43a087-e6d0-4b56-ac16-9d61f5bc8337"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"score"</span><span class="p">:</span><span class="w"> </span><span class="mf">48.3333</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">348363</span><span class="w">
            </span><span class="p">}</span><span class="w">
        </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">

  </span></code></pre></figure>


</details>

<hr>

<h3 id="owner-name">Owner Name</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/owner</code></strong></p>

<p>This endpoint delivers parcel records using the owner name, either an individual or entity. Multiple parcel records can be returned, so limit 
the response by using parameter <code class="language-plaintext highlighter-rouge">limit</code> and specify the location within a State, County and/or City using the parameter <code class="language-plaintext highlighter-rouge">path</code>.</p>

<p>These matches are based on the start of the name string. For example, if you are looking for a parcel owned by "Jones, Festus", you can search by "jon", "jone", "jones", etc. Searching for "fest", "festus", etc. will not match the parcel.</p>

<p>NOTE: This endpoint is not available for Canada.</p>

<p><strong>HTTP API request general form</strong></p>

<p><code class="language-plaintext highlighter-rouge">GET /api/v2/parcels/owner?owner=&lt;name&gt;&amp;path=&lt;path&gt;&amp;token=&lt;token&gt;</code></p>

<p><strong>Query parameters</strong></p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">owner</code>`: The owner name in Last, First format. Matches by prefix, you can pass just a last name to get any name beginning with that string. (Case insensitive, minimum 4 characters, required)</li>
  <li><code class="language-plaintext highlighter-rouge">path</code>: Represents the path for the '/us/state_id/county_slug' as defined by the Regrid Standard Schema. This restricts the search to this area.</li>
  <li><code class="language-plaintext highlighter-rouge">limit</code>: (optional) Default 20. Maximum number of Parcel Records to return. Max is 1000.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">parcels</code>: A <a href="https://geojson.org" target="_blank">GeoJSON</a> Features Collection of Features, sorted by descending relevance rank, containing the matched Parcel Records. An empty results set with no error means no Parcel Records could be matched.</li>
</ul>

<p><strong>Example API request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/?owner=techone%20development&amp;path=/us/mi/wayne/detroit&amp;limit=15&amp;token=&lt;token&gt;
</code></pre></div></div>

<details>
<summary><strong>Example results:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">{</span><span class="w">
                </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
                </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                        </span><span class="p">[</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0734727315047</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3651818518358</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0732453652113</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3647767765094</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0725988503963</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.364985221084</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0728299168503</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3653894282331</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0733713700996</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3652143873895</span><span class="w">
                            </span><span class="p">],</span><span class="w">
                            </span><span class="p">[</span><span class="w">
                                </span><span class="mf">-83.0734727315047</span><span class="p">,</span><span class="w">
                                </span><span class="mf">42.3651818518358</span><span class="w">
                            </span><span class="p">]</span><span class="w">
                        </span><span class="p">]</span><span class="w">
                    </span><span class="p">]</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 Burroughs St"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02001069-71"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parcelnumb_no_formatting"</span><span class="p">:</span><span class="w"> </span><span class="s2">"0200106971"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22320"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"OFFICE BLDG-3 STORIES OR MORE"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Special Development District Mixed Use"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="mi">1926</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office Buildings"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ASSESSED"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"TECHONE DEVELOPMENT LLC"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS ST"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"homestead_exemption"</span><span class="p">:</span><span class="w"> </span><span class="s2">"0"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_address_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">44</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">28713</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"V"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DNNNY"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AAN105"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"H"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12.2,14.7,15.1,A1"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-01-04"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="mf">2300.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="mf">2100.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office or bank building"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="mf">6000.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Developed site with buildings"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone"</span><span class="p">:</span><span class="w"> </span><span class="s2">"X"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_subtype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AREA OF MINIMAL FLOOD HAZARD"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"[{</span><span class="se">\"</span><span class="s2">zone</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">X</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">subtype</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">AREA OF MINIMAL FLOOD HAZARD</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">percent</span><span class="se">\"</span><span class="s2">:100}]"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"fema_flood_zone_data_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-10-17"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_unified_school_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit Public Schools Community District"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Planned"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_subtype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Planned"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_code_link"</span><span class="p">:</span><span class="w"> </span><span class="s2">"https://www.zoneomics.com/code/detroit-MI/chapter_11/#SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"zoning_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"10070643"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"BURROUGHS"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ST"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"{</span><span class="se">\"</span><span class="s2">address</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2">440 BURROUGHS</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">szip</span><span class="se">\"</span><span class="s2">:</span><span class="se">\"</span><span class="s2"> </span><span class="se">\"</span><span class="s2">}"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"detroit"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"wayne"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202-3429"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"szip5"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county,census_places;cass"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N BURROUGHS 10-11 BLK 12--CASS FARM CO LTD SUB L19 P35 PLATS, W C R 2/27 37-38 &amp; S 1/2 OF VAC ALLEY ADJ MANDLEBAUMS SUB L2 P8 PLATS, W C R 2/62 189.53 IRREG"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"42.365083"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-83.073037"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Yes"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163518900"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163533900"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339004021"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339004"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"census_zcta"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-01-31"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="mi">142125</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.697</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="mf">30365.0</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.69741</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">30380</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"preserved"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2024-02-06 13:03:55 -0500"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_zoning_backup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"ll_zoning_description_backup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Special Development District Mixed Use"</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                        </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit"</span><span class="p">,</span><span class="w">
                        </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
                    </span><span class="p">},</span><span class="w">
                    </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"score"</span><span class="p">:</span><span class="w"> </span><span class="mf">90.0</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="w">
            </span><span class="p">}</span><span class="w">
        </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">

  </span></code></pre></figure>


</details>

<hr>

<h3 id="query-by-fields-us">Query by Fields US</h3>

<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/query</code></strong></p>

<p>In addition to the primary identifiers in our dataset, our API is also queryable at a nationwide level using a 
subset of our 120+ schema fields that have been optimized for queries at scale. The following is the general form 
for this endpoint. See additional query endpoints in the OpenAPI Spec Sandbox for examples on each field type and our <a href="parcel-api-v2-examples">API 
Examples article</a>. Multiple fields can be used in a single query (up to 4), to refine results.</p>

<p>Currently our parcel API is also queryable at a nationwide level by the following fields:</p>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ll_gisacre</td>
      <td>numeric / double precision</td>
    </tr>
    <tr>
      <td>ll_gissqft</td>
      <td>numeric / integer</td>
    </tr>
    <tr>
      <td>usps_vacancy</td>
      <td>text</td>
    </tr>
    <tr>
      <td>rdi</td>
      <td>text</td>
    </tr>
    <tr>
      <td>ll_bldg_count</td>
      <td>numeric / integer</td>
    </tr>
    <tr>
      <td>saleprice</td>
      <td>numeric / double precision</td>
    </tr>
    <tr>
      <td>zoning</td>
      <td>text</td>
    </tr>
    <tr>
      <td>zoning_id</td>
      <td>numeric</td>
    </tr>
    <tr>
      <td>zoning_type</td>
      <td>text</td>
    </tr>
    <tr>
      <td>zoning_subtype</td>
      <td>text</td>
    </tr>
    <tr>
      <td>lbcs_activity</td>
      <td>numeric</td>
    </tr>
    <tr>
      <td>lbcs_function</td>
      <td>numeric</td>
    </tr>
    <tr>
      <td>lbcs_structure</td>
      <td>numeric</td>
    </tr>
    <tr>
      <td>lbcs_site</td>
      <td>numeric</td>
    </tr>
    <tr>
      <td>lbcs_ownership</td>
      <td>numeric</td>
    </tr>
    <tr>
      <td>saledate</td>
      <td>date</td>
    </tr>
    <tr>
      <td>szip</td>
      <td>text</td>
    </tr>
    <tr>
      <td>ll_uuid</td>
      <td>uuid</td>
    </tr>
    <tr>
      <td>landval</td>
      <td>numeric</td>
    </tr>
    <tr>
      <td>geoid</td>
      <td>text</td>
    </tr>
    <tr>
      <td>owner</td>
      <td>text</td>
    </tr>
    <tr>
      <td>parcelnumb</td>
      <td>text</td>
    </tr>
    <tr>
      <td>state2</td>
      <td>text</td>
    </tr>
    <tr>
      <td>path</td>
      <td>text</td>
    </tr>
    <tr>
      <td>county</td>
      <td>text</td>
    </tr>
    <tr>
      <td>yearbuilt</td>
      <td>numeric / integer</td>
    </tr>
    <tr>
      <td>improvval</td>
      <td>numeric / double precision</td>
    </tr>
    <tr>
      <td>alt_parcelnumb1</td>
      <td>text</td>
    </tr>
    <tr>
      <td>census_block</td>
      <td>text</td>
    </tr>
    <tr>
      <td>census_blockgroup</td>
      <td>text</td>
    </tr>
    <tr>
      <td>census_tract</td>
      <td>text</td>
    </tr>
    <tr>
      <td>census_school_district</td>
      <td>text</td>
    </tr>
    <tr>
      <td>qoz</td>
      <td>text</td>
    </tr>
    <tr>
      <td>ll_stack_uuid</td>
      <td>uuid</td>
    </tr>
  </tbody>
</table>

<h4 id="example-queries-with-supported-keys-and-value-formats">Example queries with supported keys and value formats</h4>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET or POST /api/v2/parcels/query?fields[&lt;field_name&gt;][&lt;operator&gt;]=&lt;value&gt;...&amp;token=&lt;token_value&gt;
</code></pre></div></div>

<p><strong>Example API requests</strong></p>

<p>Numeric field <code class="language-plaintext highlighter-rouge">ll_gisacre</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/parcels/query?fields[ll_gisacre][eq]=1000.2426&amp;offset_id=1234&amp;limit=5

https://app.regrid.com/api/v2/parcels/query?fields[ll_gisacre][ne]=100&amp;fields[ll_gisacre][gt]=99.0&amp;fields[ll_gisacre][lt]=200&amp;fields[ll_gisacre][between]=[100, 300]
</code></pre></div></div>

<p>Text field <code class="language-plaintext highlighter-rouge">zoning</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/parcels/query?fields[zoning][ilike]=RS-1&amp;fields[zoning][ne]=RS-1&amp;fields[zoning][between]=["RS-1", "RS-14"]&amp;fields[zoning][nin]=["RS-1", "RS-9", "MHPD", "RD-D", "AG-2"]&amp;fields[zoning][order]=DESC
</code></pre></div></div>

<p>Date field <code class="language-plaintext highlighter-rouge">saledate</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/parcels/query?&amp;fields[saledate][between]=["2020", "2021/04/22"]&amp;fields[saledate][isnull]=false&amp;limit=100
</code></pre></div></div>

<p>Boolean field <code class="language-plaintext highlighter-rouge">struct</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/parcels/query?fields[struct][ne]=false&amp;fields[struct][eq]=true&amp;fields[struct][isnull]=false
</code></pre></div></div>

<p><strong>Example results format</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
          </span><span class="err">array</span><span class="w"> </span><span class="err">of</span><span class="w"> </span><span class="err">GeoJSON</span><span class="w"> </span><span class="err">features...</span><span class="w">
        </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span></code></pre></figure>

<h4 id="supported-types-and-query-parameters">Supported types and query parameters</h4>

<p>All field types are supported. The operators available vary by field type:</p>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Field Type</th>
      <th>Operators</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Number</td>
      <td>eq, ne, isnull, between, gt, gte, lt, lte, in, nin, order</td>
    </tr>
    <tr>
      <td>Text</td>
      <td>eq, ne, isnull, in, nin, ilike</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>eq, ne, isnull, between, gt, gte, lt, lte, in, nin, order</td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>eq, ne, isnull</td>
    </tr>
    <tr>
      <td>All Types</td>
      <td>limit, count, offset_id</td>
    </tr>
  </tbody>
</table>

<h4 id="operators-on-each-field">Operators on each field</h4>

<p><code class="language-plaintext highlighter-rouge">fields[&lt;field_name&gt;][&lt;operator&gt;]</code></p>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Operator</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>eq</td>
      <td>equal</td>
    </tr>
    <tr>
      <td>ne</td>
      <td>not equal</td>
    </tr>
    <tr>
      <td>isnull</td>
      <td>is null, takes boolean true/false values only</td>
    </tr>
    <tr>
      <td>between</td>
      <td>between inclusive</td>
    </tr>
    <tr>
      <td>gt</td>
      <td>greater than</td>
    </tr>
    <tr>
      <td>gte</td>
      <td>greater than or equal</td>
    </tr>
    <tr>
      <td>lt</td>
      <td>less than</td>
    </tr>
    <tr>
      <td>lte</td>
      <td>less than or equal</td>
    </tr>
    <tr>
      <td>in</td>
      <td>in set</td>
    </tr>
    <tr>
      <td>nin</td>
      <td>not in set</td>
    </tr>
    <tr>
      <td>ilike</td>
      <td>case insensitive, matches the given string within the text field value (ex %VALUE%)</td>
    </tr>
    <tr>
      <td>order</td>
      <td>ASC/DESC</td>
    </tr>
  </tbody>
</table>

<h4 id="parameters-for-the-entire-query">Parameters for the entire query</h4>

<ul>
  <li><code class="language-plaintext highlighter-rouge">fields[&lt;field_name&gt;][&lt;operator&gt;]</code>: Use a supported field name and operator as the parameter key, and a valid value to filter parcels.</li>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">geojson</code>: A GeoJSON object with at least one geometry to filter results. The geometries can be no larger than 80 sq miles. If both <code class="language-plaintext highlighter-rouge">geojson</code> and <code class="language-plaintext highlighter-rouge">lat</code>-<code class="language-plaintext highlighter-rouge">lon</code> are present, <code class="language-plaintext highlighter-rouge">geojson</code> takes precedence. Accepted GeoJSON formats are: FeatureCollection, Feature or geometry. Supported geometries: Polygon, MultiPolygon, Point, MultiPoint, LineString and MultiLineString. Variations of geometry types are allowed in a FeatureCollection.</li>
  <li><code class="language-plaintext highlighter-rouge">radius</code>: (Default: 0, Maximum: 32000) Radius in meters for which all Parcel records will be returned if they are within the radius zone from latitude and longitude point. See <a href="#pagination">Pagination section</a> for details.</li>
  <li><code class="language-plaintext highlighter-rouge">offset_id</code>: ID from a previous query exceeding the limit, returns the next set of results up to limit.</li>
  <li><code class="language-plaintext highlighter-rouge">limit</code>: (optional) Default 20. Maximum number of Parcel Records to return. Max is 1000.</li>
  <li>
    <p><code class="language-plaintext highlighter-rouge">path</code>: Represents a full or partial path as defined by the Regrid Standard Schema ('/us/state_id', '/us/state_id/county_slug', or '/us/state_id/county_slug/city_slug'), or a full parcel path string (like '/us/state_id/county_slug/city_slug/parcel_path_id')"</p>
  </li>
  <li><code class="language-plaintext highlighter-rouge">return_count</code>: Set to true to enable count of parcels in query.</li>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code>: Default true. Features are returned without geometry values. This reduces the payload size significantly if only field data is required.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<h4 id="pagination">Pagination</h4>

<p>If your request returns more than 1000 parcel records, you will need to use pagination for your query results.</p>

<p>Pagination is performed by including an <code class="language-plaintext highlighter-rouge">offset_id</code> parameter with the integer <code class="language-plaintext highlighter-rouge">id</code> from a previous query. Each parcel record has an <code class="language-plaintext highlighter-rouge">id</code> for location in our database. You will need the <code class="language-plaintext highlighter-rouge">id</code> of the last parcel record from your previous query to use in the next iteration of the pagination request. This request returns the remaining parcels up to the value of the <code class="language-plaintext highlighter-rouge">limit</code> parameter.</p>

<p>To page results, the initial request needs to include the parameter <code class="language-plaintext highlighter-rouge">offset_id=0</code> which indicates results need to be in ID order. The required <code class="language-plaintext highlighter-rouge">id</code> is located at the root level of each parcel feature returned with <code class="language-plaintext highlighter-rouge">id</code> key.</p>

<p><img src="/assets/img/content/Parcel_id.png" alt="Parcel_id.png"></p>

<p><strong>Example pagination first request</strong></p>

<p>Give me the parcel records in Los Angeles County where the parcel acreage is greater than 2 acres. For reference, there are 228,122 parcels matching this query.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/parcels/query?fields[geoid][eq]=06037&amp;fields[ll_gisacre][gt]=2&amp;offset_id=0&amp;limit=1000
</code></pre></div></div>

<p><strong>Example pagination subsequent request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/parcels/query?fields[geoid][eq]=06037&amp;fields[ll_gisacre][gt]=2&amp;offset_id=155171239&amp;limit=1000
</code></pre></div></div>

<p>The <code class="language-plaintext highlighter-rouge">order</code> parameter is not allowed when paging, as is indicated by an error message if the query is invalid.</p>

<p>If a total count is needed, an initial query can be made with <code class="language-plaintext highlighter-rouge">count=true</code>. Otherwise, successive pages can be requested until the results are less than the limit or empty.</p>

<h4 id="count">Count</h4>

<p>When the <code class="language-plaintext highlighter-rouge">count</code> parameter is set to a boolean value of <code class="language-plaintext highlighter-rouge">true</code> or <code class="language-plaintext highlighter-rouge">false</code>, the results will be the entire dataset filtered by other optional operators on the field(s). When the boolean value is <code class="language-plaintext highlighter-rouge">true</code>, there is no cost to return the total number of parcels for the query.</p>

<p>Requests with <code class="language-plaintext highlighter-rouge">count</code> return an integer value in the following format.</p>

<p><strong>Example results format</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"count"</span><span class="p">:</span><span class="w"> </span><span class="mi">1846</span><span class="w">
  </span><span class="p">}</span></code></pre></figure>

<p>Limit is ignored when the <code class="language-plaintext highlighter-rouge">count</code> operator is present.</p>

<h4 id="customize-response-payload">Customize response payload</h4>

<p>There are several flags available to reduce payload size.</p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code>: A list of features is returned with geometry values. Default true.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: County-specific custom fields are included in results. This can be used to retrieve only Standard Schema results. Default false.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: An object of Standard Schema field names and descriptions are returned within each feature. Default false in API v2.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: A false value means only the first parcel is returned if geometries are identical. Default true.</li>
</ul>

<h4 id="request-format">Request format</h4>

<p>Queries can be made as GET or POST requests. The examples below show the same query being made by both types of request.</p>

<p><strong>GET request example</strong></p>
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>fields[ll_gisacre][eq]=1000.2426&amp;fields[ll_gisacre][ne]=1000&amp;limit=5
</code></pre></div></div>

<p><strong>POST request example</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span><span class="w">
  </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
      </span><span class="nl">"eq"</span><span class="p">:</span><span class="w"> </span><span class="mf">1000.2426</span><span class="p">,</span><span class="w">
      </span><span class="nl">"ne"</span><span class="p">:</span><span class="w">  </span><span class="mi">1000</span><span class="w">
    </span><span class="p">}</span><span class="w">
  </span><span class="p">},</span><span class="w">
  </span><span class="nl">"limit"</span><span class="p">:</span><span class="w"> </span><span class="mi">5</span><span class="w">
</span><span class="p">}</span></code></pre></figure>

<h4 id="other-considerations">Other considerations</h4>
<ul>
  <li>Date formats allowed: YYYY/MM/DD or MM/DD/YYYY
Also, a value with a year only like "2022" will evaluate as "2022/01/01".</li>
  <li>Multiple operators are <code class="language-plaintext highlighter-rouge">AND</code>ed together.</li>
  <li>Boolean and boolean-like fields (struct, usps_vacancy, rdi) can only be queried with a subset of operators (eq, ne, isnull).</li>
</ul>

<h3 id="query-by-fields-international">Query by Fields International</h3>

<p><strong><code class="language-plaintext highlighter-rouge">api/v2/&lt;country code&gt;/parcels/query</code></strong></p>

<p>In addition to the primary identifiers in our dataset, our API is also queryable at a nationwide level using a 
subset of our 76 international schema fields that have been optimized for queries at scale. The following is the general form 
for this endpoint. See additional query endpoints in the OpenAPI Spec Sandbox for examples on each field type and our <a href="parcel-api-v2-examples">API 
Examples article</a>. Multiple fields can be used in a single query (up to 4), to refine results.</p>

<p>Currently our parcel API is also queryable internationally by the following fields:</p>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ogc_fid</td>
      <td>numeric / integer</td>
    </tr>
    <tr>
      <td>geoid</td>
      <td>text</td>
    </tr>
    <tr>
      <td>parcelnumb</td>
      <td>text</td>
    </tr>
    <tr>
      <td>postcode</td>
      <td>text</td>
    </tr>
    <tr>
      <td>address</td>
      <td>text</td>
    </tr>
    <tr>
      <td>reserve</td>
      <td>text</td>
    </tr>
    <tr>
      <td>ll_gissqm</td>
      <td>numeric / double</td>
    </tr>
    <tr>
      <td>admin0</td>
      <td>text</td>
    </tr>
    <tr>
      <td>admin1</td>
      <td>text</td>
    </tr>
    <tr>
      <td>admin2</td>
      <td>text</td>
    </tr>
    <tr>
      <td>admin3</td>
      <td>text</td>
    </tr>
    <tr>
      <td>ll_uuid</td>
      <td>uuid</td>
    </tr>
    <tr>
      <td>ll_stack_uuid</td>
      <td>uuid</td>
    </tr>
    <tr>
      <td>path</td>
      <td>text</td>
    </tr>
  </tbody>
</table>

<p>Supported Countries and their respective country codes (<code class="language-plaintext highlighter-rouge">admin0</code>):</p>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Country Code</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CA</td>
      <td>Canada</td>
    </tr>
  </tbody>
</table>

<h4 id="example-queries-with-supported-keys-and-value-formats-1">Example queries with supported keys and value formats</h4>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET or POST /api/v2/&lt;country code&gt;/query?fields[&lt;field_name&gt;][&lt;operator&gt;]=&lt;value&gt;...&amp;token=&lt;token_value&gt;
</code></pre></div></div>

<p><strong>Example API requests</strong></p>

<p>Numeric field <code class="language-plaintext highlighter-rouge">ll_gissqm</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/ca/query?fields[ll_gissqm][eq]=1000.2426&amp;offset_id=1234&amp;limit=5

https://app.regrid.com/api/v2/ca/query?fields[ll_gissqm][ne]=100&amp;fields[ll_gissqm][gt]=99.0&amp;fields[ll_gissqm][lt]=200&amp;fields[ll_gissqm][between]=[100, 300]
</code></pre></div></div>

<p>Text field <code class="language-plaintext highlighter-rouge">reserve</code></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/ca/query?fields[reserve][ilike]=BIG ISLAND INDIAN RESERVE&amp;fields[zoning][ne]=BEARDYS AND OKEMASIS IR 96 AND 97B&amp;fields[reserve][order]=DESC
</code></pre></div></div>

<p><strong>Example results format</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
          </span><span class="err">array</span><span class="w"> </span><span class="err">of</span><span class="w"> </span><span class="err">GeoJSON</span><span class="w"> </span><span class="err">features...</span><span class="w">
        </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span></code></pre></figure>

<h4 id="supported-types-and-query-parameters-1">Supported types and query parameters</h4>

<p>All field types are supported. The operators available vary by field type:</p>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Field Type</th>
      <th>Operators</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Number</td>
      <td>eq, ne, isnull, between, gt, gte, lt, lte, in, nin, order</td>
    </tr>
    <tr>
      <td>Text</td>
      <td>eq, ne, isnull, in, nin, ilike</td>
    </tr>
    <tr>
      <td>All Types</td>
      <td>limit, count, offset_id</td>
    </tr>
  </tbody>
</table>

<h4 id="operators-on-each-field-1">Operators on each field</h4>

<p><code class="language-plaintext highlighter-rouge">fields[&lt;field_name&gt;][&lt;operator&gt;]</code></p>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Operator</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>eq</td>
      <td>equal</td>
    </tr>
    <tr>
      <td>ne</td>
      <td>not equal</td>
    </tr>
    <tr>
      <td>isnull</td>
      <td>is null, takes boolean true/false values only</td>
    </tr>
    <tr>
      <td>between</td>
      <td>between inclusive</td>
    </tr>
    <tr>
      <td>gt</td>
      <td>greater than</td>
    </tr>
    <tr>
      <td>gte</td>
      <td>greater than or equal</td>
    </tr>
    <tr>
      <td>lt</td>
      <td>less than</td>
    </tr>
    <tr>
      <td>lte</td>
      <td>less than or equal</td>
    </tr>
    <tr>
      <td>in</td>
      <td>in set</td>
    </tr>
    <tr>
      <td>nin</td>
      <td>not in set</td>
    </tr>
    <tr>
      <td>ilike</td>
      <td>case insensitive, matches the given string within the text field value (ex %VALUE%)</td>
    </tr>
    <tr>
      <td>order</td>
      <td>ASC/DESC</td>
    </tr>
  </tbody>
</table>

<h4 id="parameters-for-the-entire-query-1">Parameters for the entire query</h4>

<ul>
  <li><code class="language-plaintext highlighter-rouge">fields[&lt;field_name&gt;][&lt;operator&gt;]</code>: Use a supported field name and operator as the parameter key, and a valid value to filter parcels.</li>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">geojson</code>: A GeoJSON object with at least one geometry to filter results. The geometries can be no larger than 207,000 square meters. If both <code class="language-plaintext highlighter-rouge">geojson</code> and <code class="language-plaintext highlighter-rouge">lat</code>-<code class="language-plaintext highlighter-rouge">lon</code> are present, <code class="language-plaintext highlighter-rouge">geojson</code> takes precedence. Accepted GeoJSON formats are: FeatureCollection, Feature or geometry. Supported geometries: Polygon, MultiPolygon, Point, MultiPoint, LineString and MultiLineString. Variations of geometry types are allowed in a FeatureCollection.</li>
  <li><code class="language-plaintext highlighter-rouge">radius</code>: (Default: 0, Maximum: 32000) Radius in meters for which all Parcel records will be returned if they are within the radius zone from latitude and longitude point. See <a href="#pagination">Pagination section</a> for details.</li>
  <li><code class="language-plaintext highlighter-rouge">offset_id</code>: ID from a previous query exceeding the limit, returns the next set of results up to limit.</li>
  <li><code class="language-plaintext highlighter-rouge">limit</code>: (optional) Default 20. Maximum number of Parcel Records to return. Max is 1000.</li>
  <li>
    <p><code class="language-plaintext highlighter-rouge">path</code>: Represents a full or partial path as defined by the Regrid International Schema ('/admin0/admin1', '/country code/admin1/admin2_slug', or '/country code/admin1/admin2_slug/admin3_slug'), or a full parcel path string (like '/admin0/admin1/admin2_slug/admin3_slug/parcel_path_id')</p>
  </li>
  <li><code class="language-plaintext highlighter-rouge">return_count</code>: Set to true to enable count of parcels in query.</li>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code>: Default true. Features are returned without geometry values. This reduces the payload size significantly if only field data is required.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
</ul>

<h4 id="pagination-1">Pagination</h4>

<p>If your request returns more than 1000 parcel records, you will need to use pagination for your query results.</p>

<p>Pagination is performed by including an <code class="language-plaintext highlighter-rouge">offset_id</code> parameter with the integer <code class="language-plaintext highlighter-rouge">ogc_fid</code> from a previous query. Each parcel record has an <code class="language-plaintext highlighter-rouge">ogc_fid</code> field in our database. You will need the <code class="language-plaintext highlighter-rouge">ogc_fid</code> of the last parcel record from your previous query to use in the next iteration of the pagination request. This request returns the remaining parcels up to the value of the <code class="language-plaintext highlighter-rouge">limit</code> parameter.</p>

<p>To page results, the initial request needs to include the parameter <code class="language-plaintext highlighter-rouge">offset_id=0</code> which indicates results need to be in ID order. The required <code class="language-plaintext highlighter-rouge">ogc_fid</code> is located at the root level of each parcel feature returned with <code class="language-plaintext highlighter-rouge">ogc_fid</code> key.</p>

<p>Note: The ogc_fid values returned are not stable long-term but can be used dymically in pagination requests or scripts that populate these values and use them in followup requests.</p>

<p><strong>Example pagination first request</strong></p>

<p>Give me the parcel records where the parcel size is greater than 200 square meters.</p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/query?fields[geoid][eq]=06037&amp;fields[ll_gissqm][gt]=2&amp;offset_id=0&amp;limit=1000
</code></pre></div></div>

<p><strong>Example pagination subsequent request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://app.regrid.com/api/v2/query?fields[geoid][eq]=06037&amp;fields[ll_gissqm][gt]=2&amp;offset_id=155171239&amp;limit=1000
</code></pre></div></div>

<p>The <code class="language-plaintext highlighter-rouge">order</code> parameter is not allowed when paging, as is indicated by an error message if the query is invalid.</p>

<p>If a total count is needed, an initial query can be made with <code class="language-plaintext highlighter-rouge">count=true</code>. Otherwise, successive pages can be requested until the results are less than the limit or empty.</p>

<h4 id="count-1">Count</h4>

<p>When the <code class="language-plaintext highlighter-rouge">count</code> parameter is set to a boolean value of <code class="language-plaintext highlighter-rouge">true</code> or <code class="language-plaintext highlighter-rouge">false</code>, the results will be the entire dataset filtered by other optional operators on the field(s). When the boolean value is <code class="language-plaintext highlighter-rouge">true</code>, there is no cost to return the total number of parcels for the query.</p>

<p>Requests with <code class="language-plaintext highlighter-rouge">count</code> return an integer value in the following format.</p>

<p><strong>Example results format</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"count"</span><span class="p">:</span><span class="w"> </span><span class="mi">1846</span><span class="w">
  </span><span class="p">}</span></code></pre></figure>

<p>Limit is ignored when the <code class="language-plaintext highlighter-rouge">count</code> operator is present.</p>

<h4 id="customize-response-payload-1">Customize response payload</h4>

<p>There are several flags available to reduce payload size.</p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code>: A list of features is returned with geometry values. Default true.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Used to retrieve only International Schema results. Default false.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: An object of International Schema field names and descriptions are returned within each feature. Default false.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: A false value means only the first parcel is returned if geometries are identical. Default true.</li>
</ul>

<h4 id="request-format-1">Request format</h4>

<p>Queries can be made as GET or POST requests. The examples below show the same query being made by both types of request.</p>

<p><strong>GET request example</strong></p>
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>fields[ll_gisacre][eq]=1000.2426&amp;fields[ll_gisacre][ne]=1000&amp;limit=5
</code></pre></div></div>

<p><strong>POST request example</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span><span class="w">
  </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
      </span><span class="nl">"eq"</span><span class="p">:</span><span class="w"> </span><span class="mf">1000.2426</span><span class="p">,</span><span class="w">
      </span><span class="nl">"ne"</span><span class="p">:</span><span class="w">  </span><span class="mi">1000</span><span class="w">
    </span><span class="p">}</span><span class="w">
  </span><span class="p">},</span><span class="w">
  </span><span class="nl">"limit"</span><span class="p">:</span><span class="w"> </span><span class="mi">5</span><span class="w">
</span><span class="p">}</span></code></pre></figure>

<h4 id="other-considerations-1">Other considerations</h4>
<ul>
  <li>Date formats allowed: YYYY/MM/DD or MM/DD/YYYY
Also, a value with a year only like "2022" will evaluate as "2022/01/01".</li>
  <li>Multiple operators are <code class="language-plaintext highlighter-rouge">AND</code>ed together.</li>
  <li>To filter results by region, the <code class="language-plaintext highlighter-rouge">path</code> parameter in the form returned in parcel results can be used in full or partially, <code class="language-plaintext highlighter-rouge">path=/ca/on/durham/oshawa</code>.</li>
  <li>If filtering results with 'admin columns' (<code class="language-plaintext highlighter-rouge">admin0</code>, <code class="language-plaintext highlighter-rouge">admin1</code>, <code class="language-plaintext highlighter-rouge">admin2</code> and/or <code class="language-plaintext highlighter-rouge">admin3</code>), for best results use values that are returned in Regrid results and use an exact match, <code class="language-plaintext highlighter-rouge">fields[admin2][eq]=Duram</code>.</li>
</ul>

<hr>

<h3 id="area-geometry-search">Area Geometry Search</h3>

<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/area</code></strong></p>

<p>Search for parcel records in a specific geographical area. Accepted formats vary from GeoJSON Feature Collection of geometries (Polygon, MultiPolygon, Point, MultiPoint,
LineString and/or MultiLineString), or a Feature with a GeoJSON geometry or a direct GeoJSON geometry. The parameter <code class="language-plaintext highlighter-rouge">geojson</code> takes priority if <code class="language-plaintext highlighter-rouge">lat</code>/<code class="language-plaintext highlighter-rouge">lon</code> is used in the same request. These parameters also accept an optional <code class="language-plaintext highlighter-rouge">radius</code> parameter in meters to create a buffer
around the given geometries.</p>

<p>NOTE:</p>
<ul>
  <li>When adding a radius, the requested area is increased, potentially exceeding the maximum allowable size for a single request.</li>
  <li>This endpoint shares all parameters as <a href="#query-by-fields-us">Query by Fields</a> except the <code class="language-plaintext highlighter-rouge">fields</code> parameter.</li>
</ul>

<p><strong>HTTP API request</strong></p>

<p><code class="language-plaintext highlighter-rouge">POST or GET /api/v2/area</code></p>

<p><strong>Query parameters</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">geojson</code>: A GeoJSON object with at least one geometry to filter results. The geometries can be no larger than 80 sq miles. If both <code class="language-plaintext highlighter-rouge">geojson</code> and <code class="language-plaintext highlighter-rouge">lat</code>-<code class="language-plaintext highlighter-rouge">lon</code> are present, <code class="language-plaintext highlighter-rouge">geojson</code> takes precedence. Accepted GeoJSON formats are: FeatureCollection, Feature or geometry. Supported geometries: Polygon, MultiPolygon, Point, MultiPoint, LineString and MultiLineString. Variations of geometry types are allowed in a FeatureCollection.</li>
  <li><code class="language-plaintext highlighter-rouge">radius</code>: (Default: 0, Maximum: 32000) Radius in meters for which all Parcel records will be returned if they are within the radius zone from latitude and longitude point.</li>
  <li><code class="language-plaintext highlighter-rouge">offset_id</code>: ID from a previous query exceeding the limit, returns the next set of results up to limit.</li>
  <li>
    <p><code class="language-plaintext highlighter-rouge">limit</code>: (optional) Default 20. Maximum number of Parcel Records to return. Max is 1000.</p>
  </li>
  <li><code class="language-plaintext highlighter-rouge">return_count</code>: Set to true to enable count of parcels in query.</li>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code>: Default true. Features are returned without geometry values. This reduces the payload size significantly if only field data is required.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">parcels</code>: A <a href="https://geojson.org" target="_blank">GeoJSON</a> Features Collection of Features, each containing the matched Parcel Records. An empty Feature Collection with no error means no Parcel Records could be matched.</li>
  <li><code class="language-plaintext highlighter-rouge">area</code>: Total area of the searched polygon (in <code class="language-plaintext highlighter-rouge">acres</code>, <code class="language-plaintext highlighter-rouge">sq_meters</code>, and <code class="language-plaintext highlighter-rouge">sq_miles</code>).</li>
  <li><code class="language-plaintext highlighter-rouge">count</code>: Total number of parcel records within the geometry(ies), if <code class="language-plaintext highlighter-rouge">return_count</code> is true.</li>
</ul>

<p><strong>Example request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>POST /api/v2/area
</code></pre></div></div>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"token"</span><span class="p">:</span><span class="w"> </span><span class="s2">"my_token"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"geojson"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="nl">"type"</span><span class="p">:</span><span class="s2">"Feature"</span><span class="p">,</span><span class="nl">"properties"</span><span class="p">:{},</span><span class="nl">"geometry"</span><span class="p">:{</span><span class="nl">"type"</span><span class="p">:</span><span class="s2">"Polygon"</span><span class="p">,</span><span class="nl">"coordinates"</span><span class="p">:[[[</span><span class="mf">-83.074472</span><span class="p">,</span><span class="mf">42.365423</span><span class="p">],[</span><span class="mf">-83.073946</span><span class="p">,</span><span class="mf">42.364478</span><span class="p">],[</span><span class="mf">-83.071878</span><span class="p">,</span><span class="mf">42.365108</span><span class="p">],[</span><span class="mf">-83.072403</span><span class="p">,</span><span class="mf">42.366061</span><span class="p">],[</span><span class="mf">-83.074472</span><span class="p">,</span><span class="mf">42.365423</span><span class="p">]]]}},</span><span class="w">
    </span><span class="nl">"limit"</span><span class="p">:</span><span class="w"> </span><span class="mi">50</span><span class="p">,</span><span class="w">
    </span><span class="nl">"page"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="w">
  </span><span class="p">}</span></code></pre></figure>

<details>
<summary><strong>Example response:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
  </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">5.18347420691614</span><span class="p">,</span><span class="w">
    </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mf">20976.7757684935</span><span class="p">,</span><span class="w">
    </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.00809917844830647</span><span class="w">
  </span><span class="p">},</span><span class="w">
  </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
      </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">[</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0742603</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.365422</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0742035</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3653212</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0737239</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3654714</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.073782</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3655723</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0742603</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.365422</span><span class="w">
              </span><span class="p">]</span><span class="w">
            </span><span class="p">]</span><span class="w">
          </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6156 2nd Ave"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364466"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">364466</span><span class="p">,</span><span class="w">
            </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02002437."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22255"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PARKING LOT-PAVED"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"COMMERCIAL VACANT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="kc">false</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ASSESSED"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="mi">650000</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saledate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2000-09-01"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT PUBLIC SCHOOLS"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"1601 FARNSWORTH BUILDING C"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48211"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6156 2ND AVE"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N N"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AAM3"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"S"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"4.1,A1"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">" "</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2021-08-15"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="mi">5210</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Vehicular parking, storage, etc."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="mi">5210</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Surface parking, open"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="mi">6000</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Developed site with buildings"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">6100</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Nonprofit educational"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6156"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2ND"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AVE"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6156 SECOND; 48202"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"wayne"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"mi"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county,census_places;accuzip"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"E SECOND BLVD 46 MANDLEBAUMS SUB L2 P8 PLATS, W C R 2/62 40 X 140"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"42.365447"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-83.073992"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Yes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163518900"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163533900"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339003"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.129</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">5600</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.12867</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">5607</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364466"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"preserved"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"acea0d1c-50af-4c78-ad13-25b422623afc"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2021-08-20 19:59:32 -0400"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"OK"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"property_class"</span><span class="p">:</span><span class="w"> </span><span class="s2">"202"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ward"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"council_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"5"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"BOARD OF EDUCATION"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"homestead_pre"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"frontage"</span><span class="p">:</span><span class="w"> </span><span class="mi">40</span><span class="p">,</span><span class="w">
            </span><span class="nl">"depth"</span><span class="p">:</span><span class="w"> </span><span class="mi">140</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_value"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landmap"</span><span class="p">:</span><span class="w"> </span><span class="s2">"007"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"field_labels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Object ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FIPS Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceagent"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Agent"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"multistruct"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Multiple Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Year Built"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"numstories"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Stories"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"numunits"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Units"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Style"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Value Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"improvval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Improvement Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Parcel Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"agval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Agricultural Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Price"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saledate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxamt"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Annual Tax Bill"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owntype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownfrst"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner First Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownlast"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Last Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Second Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner3"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Third Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner4"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Fourth Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subsurfown"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subsurface Owner"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subowntype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subsurface Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_address2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"careof"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Care Of"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addpref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addstsuf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_unit"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Unit Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address ZIP Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_country"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Country"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_urbanization"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Urbanizacion (Puerto Rico)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Loveland Calculated Building Footprint Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Loveland Calculated Building Count"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Raw Values"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_majority_category"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Category"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_majority_percent"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Percent"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Delivery Point Validation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Notes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Match Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"CASS Error Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Residential Delivery Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Activity Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Activity"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_function"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Function Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_function_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Function"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Structure Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Structure"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Site Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Site"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Ownership Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddpref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstsuf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sunit"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Unit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Site City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Original Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"US Census County Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address County"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Site Zip"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"urbanization"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Urbanizacion"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"location_name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Location Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Primary Address Source"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Legal Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"plat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Plat"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"book"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Book"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"page"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Page"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lot"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Lot"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"neighborhood"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neighborhood"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subdivision"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Latitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Longitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxyear"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Year"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Federal Qualified Opportunity Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Qualified Opportunity Zone Tract Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Tract"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Blockgroup"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Document Reference"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourcedate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Document Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceurl"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source URL"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"recrdareatx"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (text)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (number)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Parcel Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Calculated Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Calculated Parcel Sq Ft"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"reviseddate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Date of Last Revision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Path"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Stable ID Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"UUID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Updated At"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_due"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Due"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"property_class"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Property Class"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ward"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ward"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"council_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Council District"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Taxable Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"homestead_pre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Homestead Principal Residence Exemption"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"nez"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neigborhood Enterprise Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"land_bank_inventory_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Bank Inventory Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"frontage"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Frontage"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"depth"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Depth"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"total_floor_area"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Floor Area"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_value"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Taxable Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landmap"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Map"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"related"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Related"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_numbe"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"grantor"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Grantor"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"grantee"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Grantee"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_terms"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Terms"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"verified_b"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Verification Form"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_instr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Instrument"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_trans"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Percentage of Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ecf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Economic Condition Factor Neighborhood"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"acea0d1c-50af-4c78-ad13-25b422623afc"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">364466</span><span class="w">
      </span><span class="p">},</span><span class="w">
      </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">[</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0742035</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3653212</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0741454</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3652204</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0736671</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3653706</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0737239</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3654714</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0742035</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3653212</span><span class="w">
              </span><span class="p">]</span><span class="w">
            </span><span class="p">]</span><span class="w">
          </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6150 2nd Ave"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364467"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">364467</span><span class="p">,</span><span class="w">
            </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02002436."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22255"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PARKING LOT-PAVED"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"COMMERCIAL VACANT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="kc">false</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ASSESSED"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="mi">381083</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saledate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2002-12-12"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT PUBLIC SCHOOLS"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"1601 FARNSWORTH BUILDING C"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48211"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6150 2ND AVE"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N N"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AAM3"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"S"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"4.1,A1"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">" "</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2021-08-15"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="mi">5210</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Vehicular parking, storage, etc."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="mi">5210</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Surface parking, open"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="mi">6000</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Developed site with buildings"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">6100</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Nonprofit educational"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6150"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2ND"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AVE"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"6150 SECOND; 48202"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"wayne"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"mi"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county,census_places;accuzip"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"E SECOND BLVD 45 MANDLEBAUMS SUB L2 P8 PLATS, W C R 2/62 40 X 140"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"42.365346"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-83.073935"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Yes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163518900"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163533900"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339003"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.129</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">5600</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.12861</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">5605</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364467"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"preserved"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12dd4d30-cf89-4e2d-aad3-2503edb4f799"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2021-08-20 19:59:32 -0400"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"OK"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"property_class"</span><span class="p">:</span><span class="w"> </span><span class="s2">"202"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ward"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"council_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"5"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"BOARD OF EDUCATION"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"homestead_pre"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"frontage"</span><span class="p">:</span><span class="w"> </span><span class="mi">40</span><span class="p">,</span><span class="w">
            </span><span class="nl">"depth"</span><span class="p">:</span><span class="w"> </span><span class="mi">140</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_value"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landmap"</span><span class="p">:</span><span class="w"> </span><span class="s2">"007"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"field_labels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Object ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FIPS Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceagent"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Agent"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"multistruct"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Multiple Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Year Built"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"numstories"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Stories"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"numunits"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Units"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Style"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Value Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"improvval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Improvement Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Parcel Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"agval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Agricultural Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Price"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saledate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxamt"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Annual Tax Bill"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owntype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownfrst"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner First Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownlast"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Last Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Second Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner3"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Third Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner4"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Fourth Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subsurfown"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subsurface Owner"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subowntype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subsurface Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_address2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"careof"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Care Of"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addpref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addstsuf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_unit"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Unit Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address ZIP Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_country"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Country"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_urbanization"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Urbanizacion (Puerto Rico)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Loveland Calculated Building Footprint Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Loveland Calculated Building Count"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Raw Values"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_majority_category"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Category"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_majority_percent"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Percent"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Delivery Point Validation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Notes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Match Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"CASS Error Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Residential Delivery Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Activity Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Activity"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_function"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Function Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_function_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Function"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Structure Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Structure"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Site Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Site"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Ownership Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddpref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstsuf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sunit"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Unit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Site City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Original Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"US Census County Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address County"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Site Zip"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"urbanization"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Urbanizacion"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"location_name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Location Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Primary Address Source"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Legal Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"plat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Plat"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"book"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Book"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"page"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Page"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lot"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Lot"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"neighborhood"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neighborhood"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subdivision"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Latitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Longitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxyear"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Year"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Federal Qualified Opportunity Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Qualified Opportunity Zone Tract Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Tract"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Blockgroup"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Document Reference"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourcedate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Document Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceurl"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source URL"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"recrdareatx"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (text)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (number)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Parcel Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Calculated Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Calculated Parcel Sq Ft"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"reviseddate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Date of Last Revision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Path"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Stable ID Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"UUID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Updated At"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_due"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Due"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"property_class"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Property Class"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ward"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ward"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"council_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Council District"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Taxable Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"homestead_pre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Homestead Principal Residence Exemption"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"nez"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neigborhood Enterprise Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"land_bank_inventory_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Bank Inventory Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"frontage"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Frontage"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"depth"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Depth"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"total_floor_area"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Floor Area"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_value"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Taxable Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landmap"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Map"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"related"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Related"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_numbe"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"grantor"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Grantor"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"grantee"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Grantee"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_terms"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Terms"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"verified_b"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Verification Form"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_instr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Instrument"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_trans"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Percentage of Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ecf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Economic Condition Factor Neighborhood"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12dd4d30-cf89-4e2d-aad3-2503edb4f799"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">364467</span><span class="w">
      </span><span class="p">}</span><span class="w">
    </span><span class="p">]</span><span class="w">
  </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
  </span></code></pre></figure>


</details>

<hr>

<h3 id="typeahead-by-address">Typeahead (by Address)</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/typeahead</code></strong></p>

<p>This endpoint delivers a full address lookup and validation with corresponding unique identifier (<code class="language-plaintext highlighter-rouge">ll_uuid</code>) for each parcel based on matching the query.</p>

<p>Please see <a href="/api/using-the-typeahead-api">the Typeahead API documentation</a> for details about this feature, and
contact our sales team at <a href="mailto:parcels@regrid.com">parcels@regrid.com</a> for a demo or to enable your account.</p>

<p><strong>Query parameters</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">query</code>: A street address or partial address, starting at the beginning</li>
</ul>

<p>Note: US-only</p>

<hr>

<h2 id="additional-endpoints">Additional Endpoints</h2>

<hr>

<h3 id="parcel-path">Parcel Path</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/path</code></strong></p>

<p>This endpoint delivers a single parcel record based on the unique <code class="language-plaintext highlighter-rouge">path</code>. This works well in combination with the 
Typeahead API endpoint.</p>

<p><strong>HTTP API request general form</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code> GET /api/v2/parcel?path=&lt;path&gt;&amp;token=&lt;token&gt;
</code></pre></div></div>

<p><strong>Query parameters</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">path</code>: (required) The canonical path of the parcel in the Regrid system. For example, '/us/tx/dallas/northeast-dallas/6471' or '/ca/mb/division-no-11/winnipeg/52941'.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<p><strong>Example request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code> GET https://app.regrid.com/api/v2/parcel?path=/us/mi/wayne/detroit/364491&amp;token=&lt;token&gt;
</code></pre></div></div>

<p><strong>Example truncated results</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span><span class="w">
    </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
      </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
      </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
        </span><span class="p">{</span><span class="w">
          </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="p">[</span><span class="w">
                  </span><span class="mf">-83.0734768</span><span class="p">,</span><span class="w">
                  </span><span class="mf">42.36519</span><span class="w">
                </span><span class="p">]</span><span class="w">
              </span><span class="p">]</span><span class="w">
            </span><span class="p">]</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 Burroughs St"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="p">,</span><span class="w">
              </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.697</span><span class="w">
            </span><span class="p">},</span><span class="w">
            </span><span class="nl">"field_labels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"UUID"</span><span class="p">,</span><span class="w">
              </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Acres"</span><span class="w">
            </span><span class="p">},</span><span class="w">
            </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
              </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit"</span><span class="p">,</span><span class="w">
              </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit"</span><span class="p">,</span><span class="w">
              </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
            </span><span class="p">},</span><span class="w">
            </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="w">
        </span><span class="p">}</span><span class="w">
      </span><span class="p">]</span><span class="w">
    </span><span class="p">}</span><span class="w">
  </span><span class="p">}</span><span class="w">
  </span></code></pre></figure>

<hr>

<h3 id="regrid-id">Regrid ID</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/parcels/&lt;ll_uuid&gt;</code></strong></p>

<p>This endpoint delivers a single parcel record based on the Regrid id (<code class="language-plaintext highlighter-rouge">ll_uuid</code>), as described in our <a href="/parcel-data/schema#ll_uuid">parcel schema</a> or retrieve the <a href="#regrid-parcel-schema">schema definition</a> from the API.</p>

<p>This works well in combination with the Typeahead API endpoint or any time you have an <code class="language-plaintext highlighter-rouge">ll_uuid</code> of interest.</p>

<p><strong>HTTP API request general form</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /api/v2/parcels/&lt;ll_uuid&gt;?token=&lt;token&gt;
</code></pre></div></div>

<p><strong>Query parameters</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">ll_uuid</code>: (required) The UUID retrieved from another Regrid API call. For example, 8b6f4f51-58ad-4969-93b3-fdfb348a7084.</li>
  <li><code class="language-plaintext highlighter-rouge">return_custom</code>: Default false: A true value allows county-specific fields to be passed through beyond standard schema fields only.</li>
  <li><code class="language-plaintext highlighter-rouge">return_field_labels</code>: Default false: A true value shows the naming convention for each standardized schema field.</li>
  <li><code class="language-plaintext highlighter-rouge">return_stacked</code>: Default true: A false value returns the first parcel if geometries are identical.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_buildings</code>: Set to false to disable building footprint data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_matched_addresses</code>: Set to false to matched addresses data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_enhanced_ownership</code>: Set to false to disable enhanced ownership data in the response. Default is true when supported by the account.</li>
  <li><code class="language-plaintext highlighter-rouge">return_zoning</code>: Set to false to disable zoning data in the response. Default is true when supported by the account.</li>
</ul>

<p><strong>Example API request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/parcels/16bc4f67-009a-496c-bd0a-9e9d55f5228b?token=&lt;token&gt;
</code></pre></div></div>

<details>
<summary><strong>Example results:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
  </span><span class="nl">"parcels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
      </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">[</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0734768</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.36519</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0732494</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3647849</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0726029</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3649934</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.072834</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3653976</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0733754</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.3652225</span><span class="w">
              </span><span class="p">],</span><span class="w">
              </span><span class="p">[</span><span class="w">
                </span><span class="mf">-83.0734768</span><span class="p">,</span><span class="w">
                </span><span class="mf">42.36519</span><span class="w">
              </span><span class="p">]</span><span class="w">
            </span><span class="p">]</span><span class="w">
          </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 Burroughs St"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
          </span><span class="nl">"fields"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="p">,</span><span class="w">
            </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"02001069-71"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"22320"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"OFFICE BLDG-3 STORIES OR MORE"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SD2"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"COMMERCIAL"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
            </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="mi">1926</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office Buildings"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ASSESSED"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"TECHONE DEVELOPMENT LLC"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"MI"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS ST"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">27956</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"V"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DN NY"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"AAN105"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"H"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12.2,14.7,15.1,A1"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2021-12-02"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="mi">2300</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="mi">2100</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Office or bank building"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="mi">6000</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Developed site with buildings"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"BURROUGHS"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ST"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"DETROIT"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"440 BURROUGHS"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"wayne"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"mi"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48202-3429"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"county,census_places;accuzip"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"N BURROUGHS 10-11 BLK 12--CASS FARM CO LTD SUB L19 P35 PLATS, W C R 2/27 37-38 &amp; S 1/2 OF VAC ALLEY ADJ MANDLEBAUMS SUB L2 P8 PLATS, W C R 2/62 189.53 IRREG"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"42.365091"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"-83.073041"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Yes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163518900"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"26163533900"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"261635339003"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.697</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">30365</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.69713</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="mi">30380</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit/364491"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"preserved"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2021-12-08 14:42:19 -0500"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"OK"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"property_class"</span><span class="p">:</span><span class="w"> </span><span class="s2">"201"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ward"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"council_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"5"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PA 245"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"homestead_pre"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"frontage"</span><span class="p">:</span><span class="w"> </span><span class="mi">190</span><span class="p">,</span><span class="w">
            </span><span class="nl">"depth"</span><span class="p">:</span><span class="w"> </span><span class="mi">160</span><span class="p">,</span><span class="w">
            </span><span class="nl">"total_floor_area"</span><span class="p">:</span><span class="w"> </span><span class="mi">142125</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_value"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landmap"</span><span class="p">:</span><span class="w"> </span><span class="s2">"007"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"field_labels"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Object ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FIPS Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceagent"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Agent"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"multistruct"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Multiple Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Year Built"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"numstories"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Stories"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"numunits"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Units"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Style"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Value Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"improvval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Improvement Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Parcel Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"agval"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Agricultural Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Price"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saledate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxamt"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Annual Tax Bill"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxyear"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Year"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owntype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownfrst"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner First Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownlast"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Last Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Second Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner3"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Third Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"owner4"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Fourth Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subsurfown"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subsurface Owner"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subowntype"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subsurface Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_address2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"careof"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Care Of"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addpref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_addstsuf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_unit"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Unit Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address ZIP Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_country"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Country"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"mail_urbanization"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Urbanizacion (Puerto Rico)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Loveland Calculated Building Footprint Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Loveland Calculated Building Count"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_raw"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Raw Values"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_majority_category"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Category"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_majority_percent"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Percent"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cdl_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Delivery Point Validation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Notes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Match Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"CASS Error Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Residential Delivery Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Activity Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Activity"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_function"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Function Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_function_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Function"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Structure Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Structure"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Site Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Site"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership"</span><span class="p">:</span><span class="w"> </span><span class="s2">"LBCS Ownership Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lbcs_ownership_desc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddpref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"saddstsuf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sunit"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Unit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Site City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Original Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="s2">"US Census County Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address County"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Site Zip"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"urbanization"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Urbanizacion"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"location_name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Location Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Primary Address Source"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Legal Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"plat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Plat"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"book"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Book"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"page"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Page"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lot"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Lot"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"neighborhood"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neighborhood"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"subdivision"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Latitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Longitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Federal Qualified Opportunity Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Qualified Opportunity Zone Tract Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Tract"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2010 Blockgroup"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceref"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Document Reference"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourcedate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source Document Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sourceurl"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source URL"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"recrdareatx"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (text)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (number)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Parcel Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Calculated Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Calculated Parcel Sq Ft"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"reviseddate"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Date of Last Revision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Path"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Stable ID Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"UUID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Updated At"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tax_due"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Due"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"property_class"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Property Class"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ward"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ward"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"council_district"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Council District"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Taxable Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"homestead_pre"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Homestead Principal Residence Exemption"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"nez"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neigborhood Enterprise Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"land_bank_inventory_status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Bank Inventory Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"frontage"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Frontage"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"depth"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Depth"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"total_floor_area"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Floor Area"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"taxable_value"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Taxable Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"landmap"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Map"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"related"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Related"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_numbe"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"grantor"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Grantor"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"grantee"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Grantee"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_terms"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Terms"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"verified_b"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Verification Form"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_instr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Instrument"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sale_trans"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Sale Percentage of Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ecf"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Economic Condition Factor Neighborhood"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"context"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"headline"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit, MI"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/mi/wayne/detroit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"active"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"16bc4f67-009a-496c-bd0a-9e9d55f5228b"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">364491</span><span class="w">
      </span><span class="p">}</span><span class="w">
    </span><span class="p">]</span><span class="w">
  </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
  </span></code></pre></figure>


</details>
<hr>

<h2 id="schemas">Schemas</h2>

<p>Retrieve a json representation of our Schemas</p>

<h3 id="regrid-parcel-schema">Regrid Parcel Schema</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/us/schemas/parcel</code></strong></p>

<p>This endpoint retrieves the current Regrid Parcel Schema. You can use <code class="language-plaintext highlighter-rouge">premium_only</code> to retrieve the schema listed for only premium fields.</p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">premium_only</code>: Default returns all. Set to <code class="language-plaintext highlighter-rouge">true</code> to return schema for only premium fields and <code class="language-plaintext highlighter-rouge">false</code> to return only Standard fields. US schema only.</li>
</ul>

<p><strong>HTTP API request</strong></p>

<p><code class="language-plaintext highlighter-rouge">GET /api/v2/us/schemas/parcel</code></p>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">schema</code>: An object with details on all fields in the <a href="/parcel-data/schema">Regrid Parcel Schema</a>.</li>
</ul>

<details>
  <summary><strong>Example response:</strong></summary>
  
    
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">    </span><span class="p">{</span><span class="w">
    </span><span class="nl">"schema"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"serial primary key"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Object ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FIPS Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FIPS code (state + county FIPS codes)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The assessor's primary parcel identification number or code."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parcelnumb_no_formatting"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel ID without Formatting"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The primary parcel identification number with spaces and formatting characters removed."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"0010204624001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"state_parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"State Provided Parcel ID Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Statewide parcel identification number. Collected where available from states that provide a statewide parcel ID."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"account_number"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Account Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The assessor or tax collector's account identification number for a property."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"tax_id"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Tax Identification Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The assessor or tax collector's tax identification number for a property."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"alt_parcelnumb1"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"First Alternative Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided additional or alternative parcel identification number."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"alt_parcelnumb2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Second Alternative Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided additional or alternative parcel identification number."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"alt_parcelnumb3"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Third Alternative Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided additional or alternative parcel identification number."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Varies by governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="mi">104</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Varies by governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Residential"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Code used by the governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"R-1"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Human-readable name for the zoning code defined by the governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Residential"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning_type"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Standardized zoning type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Residential"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning_subtype"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Subtype"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Standardized zoning subtype"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Single-family"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning_code_link"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Code Link"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Link to the municipality's zoning code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"https://www.zoneomics.com/code/detroit-MI"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning_id"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Area ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ID for the zoning area for matching to the Regrid zoning product"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="mi">5555</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"boolean"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Year Built"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"numstories"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Stories"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"numunits"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Living Units"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The number of individual living units, apartments or condominiums on a parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"numrooms"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Rooms"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The number of rooms in the parcel's primary structure as recorded in county records."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Style"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Value Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The type of value reported in the parcel value fields"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Appraised"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Assessed"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Taxable"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Market"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Market Value"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"improvval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Improvement Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"landval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Parcel Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"agval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Agricultural Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"homestead_exemption"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Homestead Exemption"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided attribute indicating if the parcel has any tax exemption due to homestead status."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Price"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saledate"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"taxamt"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Annual Tax Bill"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"taxyear"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Year"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided attribute indicating the tax year the assessor data applies to."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"owntype"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ownfrst"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner First Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ownlast"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Last Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"owner2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Second Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"owner3"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Third Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"owner4"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Fourth Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"previous_owner"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Previous Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The previous owner or grantor of a parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"This is the address where the tax and other assessor's communications are sent. It is often thought of as the owner's mailing address. It is often the same address as the parcel physical street address, but very commonly it is a different address than the parcel address itself."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_address2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"careof"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Care Of"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_addno"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"402"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_addpref"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"S"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_addstr"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"FOURTH"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_addsttyp"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"AVE"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_addstsuf"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"NW"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_unit"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Unit Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"APT # 2"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Ann Arbor"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_state2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address State 2-Letter abbreviation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"MI"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_zip"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address ZIP Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_country"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Country"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"US"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Bolivia"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Canada"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_urbanization"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Urbanizacion (Puerto Rico)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"This is the address of the parcel itself. Also called the </span><span class="se">\"</span><span class="s2">situs address</span><span class="se">\"</span><span class="s2"> or </span><span class="se">\"</span><span class="s2">site address</span><span class="se">\"</span><span class="s2">. Not every parcel has a street address, especially in agricultural areas and other large parcels."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"12109 KATZ RD"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"address2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"12109"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddpref"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"N"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"GLENN"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"RD"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddstsuf"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"NW"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"sunit"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Unit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Apt 2"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Unit B"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"6th floor"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"GRASS LAKE"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Original Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address fields as originally provided by the county, encoded as a JSON object. This field was originally separated by a semicolon and a space and data will exist in that format as a migration happens over time."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12109 Katz Rd"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"12109"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Katz Rd"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ann Arbor"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="s2">"48105"</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="s2">"12109 Katz Rd; NW; Ann Arbor; MI; 48105"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"US Census County Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Used for organizational purposes. Refer to scity for the city associated with the site address."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address County"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"state2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address State"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"MI"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"szip"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Zip Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"48103"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"48104-3423"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"szip5"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"5 Digit Parcel Zip Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"48103"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"urbanization"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Urbanizacion"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"A postal address field commonly used in Puerto Rico"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_address_count"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Total Address Count"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total number of primary and secondary addresses on the parcel as calculated by Regrid"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"location_name"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Location Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"A name commonly associated with this parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Primary Address Source"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Default source if none is listed is the county."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"openaddresses"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"county"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Legal Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"plat"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Plat"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Plat number the parcel is recorded on"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"A"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"book"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Book"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Book/Liber the parcel is recorded in"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="mi">231</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"page"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Page"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Page/Folio the parcel is recorded on"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="mi">2</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"block"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lot"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Lot"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"neighborhood"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neighborhood"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"subdivision"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Latitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"On parcel centroid latitude decimal coordinate"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Longitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"On parcel centroid longitude decimal coordinate"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"fema_flood_zone"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FEMA Flood Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"fema_flood_zone_subtype"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FEMA Flood Zone Subtype"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"fema_flood_zone_raw"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FEMA Flood Zone Raw Data"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"fema_flood_zone_data_date"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FEMA Flood Zone Data Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"qoz"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Federal Qualified Opportunity Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Is this parcel in a US Federal Qualified Opportunity Zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Yes"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"No"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"qoz_tract"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Qualified Opportunity Zone Tract Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census tract number as it was defined in Dec 2018 when QOZs were designated."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="mi">30059000100</span><span class="p">,</span><span class="w">
                </span><span class="mi">30107000100</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"census_tract"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2020 Tract"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"census_block"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2020 Block"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"census_blockgroup"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census 2020 Blockgroup"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"census_zcta"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census Zip Code Tabulation Area"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The Census Zip Code Tabulation Area (ZCTA) in which the center of the parcel is located."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"census_elementary_school_district"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census Provided Elementary School District"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"census_secondary_school_district"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census Provided Secondary School District"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"census_unified_school_district"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census Provided Unified School District"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last County Refresh Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The last date Regrid refreshed the data from the County."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"sourceurl"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source URL"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"A county-provided URL to the county parcel record online"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"recrdareatx"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (text)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Square Footage of Structures"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided number in square feet that indicates the total habitable / taxable area of buildings on the parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"gisacre"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"sqft"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"County-Provided Parcel Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Parcel Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel acres as calculated by Regrid from the parcel geometry"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"bigint"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Parcel Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel square feet as calculated by Regrid from the parcel geometry"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_bldg_footprint_sqft"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Building Footprint Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total building footprint in square feet as calculated by Regrid"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_bldg_count"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Building Count"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total number of buildings on the parcel as calculated by Regrid"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"cdl_raw"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Raw Values"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"This is an array of [value,percentage] pairs that represent the pixel classes present in the parcel and their percentage of the total pixels."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="p">[</span><span class="w">
                    </span><span class="p">[</span><span class="w">
                        </span><span class="s2">"36"</span><span class="p">,</span><span class="w">
                        </span><span class="s2">"60.0"</span><span class="w">
                    </span><span class="p">],</span><span class="w">
                    </span><span class="p">[</span><span class="w">
                        </span><span class="s2">"75"</span><span class="p">,</span><span class="w">
                        </span><span class="s2">"20.0"</span><span class="w">
                    </span><span class="p">],</span><span class="w">
                    </span><span class="p">[</span><span class="w">
                        </span><span class="s2">"87"</span><span class="p">,</span><span class="w">
                        </span><span class="s2">"10.0"</span><span class="w">
                    </span><span class="p">],</span><span class="w">
                    </span><span class="p">[</span><span class="w">
                        </span><span class="s2">"190"</span><span class="p">,</span><span class="w">
                        </span><span class="s2">"10.0"</span><span class="w">
                    </span><span class="p">]</span><span class="w">
                </span><span class="p">]</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"cdl_majority_category"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Category"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"This is the human readable Category name for the land cover type that is most common on the parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Alfalfa"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"cdl_majority_percent"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Majority Percent"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"This is the actual percentage of pixels for the majority category."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"60.0"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"cdl_date"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Cropland Data Layer Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The year of the Cropland Data Layer data set the current attributes are derived from."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"2021"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"plss_township"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PLSS Township"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Public Land Survey System Township reference."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"plss_section"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PLSS Section"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Public Land Survey System Section reference."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"plss_range"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PLSS Range"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Public Land Survey System Range reference."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"reviseddate"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Date of Last Revision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The last date of last revision as provided by the county assessor's office if available."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Path"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid's human-readable identifier for this parcel. Not guaranteed to be stable between updates."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"/us/mi/wayne/detroit/123"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"/us/ny/new-york/manhattan/375553"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Stable ID Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Indicates if the path and ll_uuid values have changed during the last refresh from the county. A value of 'preserved' means the 'll_uuid' was matched during county refresh to the previous data. A 'null' indicates a new ll_uuid was generated because the new data was not matched to the existing data during the county data refresh process."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"preserved (if unchanged)"</span><span class="p">,</span><span class="w">
                </span><span class="kc">null</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"uuid"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid UUID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Uniquely identifies a single parcel with a v4 uuid. A stable parcel id across county data refreshes. This field should be used for tracking individual parcels."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"4cc9eda6-883c-4f38-9a07-b44900a64b16"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_stack_uuid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Stack UUID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Uniquely identifies a group of parcels with exact duplicate geometries using one stack member parcel's ll_uuid assigned to all the parcels in the stack. This field should be used for identifying and working with groups of stacked parcels (parcels with exactly duplicated parcel geometry). The parcel ll_uuid chosen for the ll_stack_uuid is arbitrary and does not indicate a primary parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"4cc9eda6-883c-4f38-9a07-b44900a64b16"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_row_parcel"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Right-of-Way Parcel Flag"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Identifies a parcel as being a likely right-of-way parcel. These are usually roads, streetsets, railways, utilities, rivers, etc. Values are text strings identifying the trait of the parcel that led to it being flagged."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"parcel_number"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"land_use"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"perimeter_ratio"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"hull_ratio"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_row_parcel_dev"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ROW Parcel Dev Column"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Development column for the ROW flag. Not delivered to clients."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Y"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"timestamp with time zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Modified"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Timestamp of the last modification of any kind to this row."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"2019-06-06 12:45:21.285102-04"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"placekey"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Placekey"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Full description TK"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"227-223@5vg-82n-pgk"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"dpv_status"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Delivery Point Validation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"V"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"N"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"dpv_codes"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"dpv_notes"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Validation Notes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"dpv_type"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Delivery Point Match Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"H (High Rise)"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"S (Street)"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"cass_errorno"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"CASS Error Codes"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"rdi"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Residential Delivery Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Y"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"N"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"usps_vacancy"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Y"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"usps_vacancy_date"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"USPS Vacancy Indicator Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Date the vacancy indicator was collected"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_no_cass"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Indicates a parcel not to be run through the USPS CASS process."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Indicates a parcel not to be run through the USPS CASS process, usually because CASS software will mis-fix the address. Not delivered to clients."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"no cass"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"padus_public_access"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"PAD-US Public Access Designation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"United States Geological Survey Protected Areas Database of the United States Public Access designation."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Open Access"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Restricted Access"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Unknown (Closed)"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Closed"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Activity"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Actual activity on land, eg farming, shopping, manufacturing."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Activity"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Description of the LBCS numeric code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_function"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Function"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Economic function or type of establishment, eg agricultural, commercial, industrial"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_function_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Function"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Economic function or type of establishment, eg agricultural, commercial, industrial"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Structure"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Type of structure or building, eg single-family house, office building, warehouse"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Structure"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Type of structure or building, eg single-family house, office building, warehouse"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Site"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"What is on the land"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Site"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"What is on the land"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_ownership"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ownership structure, eg public, private"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_ownership_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ownership structure, eg public, private"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_zoning_backup"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Backup"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning data as collected by Regrid. The zoning column may be overwritten by zoneomics data; this preserves it"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"R1"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"none"</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_zoning_description_backup"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Description Backup"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning data as collected by Regrid. The zoning_description column may be overwritten by zoneomics data; this preserves it"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Residential"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"none"</span><span class="w">
        </span><span class="p">}</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">

    </span></code></pre></figure>

  
</details>

<h3 id="matched-buildings-schema">Matched Buildings Schema</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/us/schemas/building</code></strong></p>

<p>This endpoint retrieves the current Regrid Matched Building Footprints schema.</p>

<h3 id="matched-addresses-schema">Matched Addresses Schema</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/us/schemas/address</code></strong></p>

<p>This endpoints retrieves the current Regrid Matched Secondary Addresses</p>

<h3 id="enhanced-ownership-schema">Enhanced Ownership Schema</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/us/schemas/enhanced_ownership</code></strong></p>

<p>This endpoint retrieves the current Regrid Enhanced Ownership Schema.</p>

<h3 id="standardized-zoning-schema">Standardized Zoning Schema</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/us/schemas/zoning</code></strong></p>

<p>This endpoint retrieves the current Regrid Standardized Zoning Schema.</p>

<h3 id="canada-parcel-schema">Canada Parcel Schema</h3>

<p><strong>HTTP API request</strong></p>

<p><code class="language-plaintext highlighter-rouge">GET /api/v2/ca/schemas/parcel</code></p>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">schema</code>: An object with details on all fields in the Regrid Canada Parcel Schema.</li>
</ul>

<details>
  <summary><strong>Example response:</strong></summary>
  
    
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">    </span><span class="p">{</span><span class="w">
    </span><span class="nl">"schema"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"ogc_fid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"serial primary key"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Object ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"admin0"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Country Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The ISO 3166-1 alpha-2 country code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"US"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"CA"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"GT"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Canadian Census Division ID Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Indicates the number of a Canadian census division"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parcelnumb"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The assessor's primary parcel identification number or code."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parcelnumb_no_formatting"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel ID without Formatting"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The primary parcel identification number with spaces and formatting characters removed."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"0010204624001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"alt_parcelnumb1"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"First Alternative Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided additional or alternative parcel identification number."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"alt_parcelnumb2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Second Alternative Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided additional or alternative parcel identification number."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"alt_parcelnumb3"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Third Alternative Parcel ID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided additional or alternative parcel identification number."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"02004940"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"001-020-4624-001"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"usecode"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Varies by governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="mi">104</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"usedesc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Use Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Varies by governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Residential"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Code used by the governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"R-1"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"zoning"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"zoning_description"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Zoning Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Human-readable name for the zoning code defined by the governing municipality"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Residential"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"zoning"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"struct"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"boolean"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"structno"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Structures on Parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"yearbuilt"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Year Built"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"numstories"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Stories"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"numunits"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Living Units"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The number of individual living units, apartments or condominiums on a parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"numrooms"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Number of Rooms"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The number of rooms in the parcel's primary structure as recorded in county records."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"structstyle"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Structure Style"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parvaltype"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Value Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The type of value reported in the parcel value fields"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Appraised"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Assessed"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Taxable"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Market"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Market Value"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"improvval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Improvement Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"landval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"parval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Parcel Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"agval"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Agricultural Value"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Price"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saledate"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Sale Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"taxamt"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Annual Tax Bill"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"taxyear"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Tax Year"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided attribute indicating the tax year the assessor data applies to."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"owntype"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Owner Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mailadd"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"This is the address where the tax and other assessor's communications are sent. It is often thought of as the owner's mailing address. It is often the same address as the parcel physical street address, but very commonly it is a different address than the parcel address itself."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_address2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_unit"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Unit Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"APT # 2"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_city"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Ann Arbor"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_province2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Province"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Province 2-Letter abbreviation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"PE"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_postcode"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Postcode"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"mail_country"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Mailing Address Country"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"US"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Bolivia"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Canada"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"owner_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"This is the address of the parcel itself. Also called the </span><span class="se">\"</span><span class="s2">situs address</span><span class="se">\"</span><span class="s2"> or </span><span class="se">\"</span><span class="s2">site address</span><span class="se">\"</span><span class="s2">. Not every parcel has a street address, especially in agricultural areas and other large parcels."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"170 SUMACH STREET"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"address2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Second Line"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"pii"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Number"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"12109"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddpref"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Prefix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"N"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"GLENN"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddsttyp"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Type"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"RD"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"saddstsuf"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Street Suffix"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"NW"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"sunit"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Unit"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Apt 2"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Unit B"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"6th floor"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address City"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"GRASS LAKE"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"postcode"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Postal Code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"M5A 0C3"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"original_address"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Original Parcel Address"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address fields as originally provided by the county, encoded as a JSON object. This field was originally separated by a semicolon and a space and data will exist in that format as a migration happens over time."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"address"</span><span class="p">:</span><span class="w"> </span><span class="s2">"170 SUMACH STREET"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"saddno"</span><span class="p">:</span><span class="w"> </span><span class="s2">"170"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"saddstr"</span><span class="p">:</span><span class="w"> </span><span class="s2">"SUMACH"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"scity"</span><span class="p">:</span><span class="w"> </span><span class="s2">"TORONTO"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"postcode"</span><span class="p">:</span><span class="w"> </span><span class="s2">"M5A 0C3"</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="s2">"170 SUMACH STREET; TORONTO; ON; M5A 0C3"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"admin1"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Address Province"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"QC"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"admin2"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Administrative boundary beneath the subnational"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"admin2_slug"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Administrative boundary beneath the subnational in slug form"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"admin3"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Canada Census Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Used for organizational purposes. Refer to scity for the city associated with the site address."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"admin3_slug"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Canada Census Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Census subdivision used for organizational purposes in slug form. Refer to scity for the city associated with the site address."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"reserve"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"First Nations Reserve Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Six Nations of the Grand River"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Used to indicate when a parcel is administered directly by a First Nation"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_address_count"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Total Address Count"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total number of primary and secondary addresses on the parcel as calculated by Regrid"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"calculated"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"location_name"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Location Name"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"A name commonly associated with this parcel"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"address_source"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Primary Address Source"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Default source if none is listed is the county."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"openaddresses"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"county"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"situs_address"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"legaldesc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Legal Description"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"neighborhood"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Neighborhood"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"subdivision"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Subdivision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lat"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Latitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"On parcel centroid latitude decimal coordinate"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lon"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Longitude"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"On parcel centroid longitude decimal coordinate"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last County Refresh Date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The last date Regrid refreshed the data from the County."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"provider_type"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel provider code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel provider code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"data_source"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel provider"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Where the parcels are sourced from (federal/provincial/local)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"sourceurl"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Source URL"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"A county-provided URL to the county parcel record online"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"recrdareatx"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Recorded Area (text)"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Meters"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"Square Feet"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"recrdareano"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"integer"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Total Area of Structures"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"An assessor-provided number in a given unit that indicates the total habitable / taxable area of buildings on the parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_gissqm"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Parcel Square Meterage"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel square meters as calculated by Regrid from the parcel geometry"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"calculated"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_gisacre"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"double precision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Parcel Acres"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel acres as calculated by Regrid from the parcel geometry"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"calculated"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_gissqft"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"bigint"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Calculated Parcel Square Feet"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel square feet as calculated by Regrid from the parcel geometry"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"standard"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"assessor_data"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"calculated"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"reviseddate"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"date"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Date of Last Revision"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"The last date of last revision as provided by the county assessor's office if available."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"manually_mapped"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Path"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid's human-readable identifier for this parcel. Not guaranteed to be stable between updates."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"/us/mi/wayne/detroit/123"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"/us/ny/new-york/manhattan/375553"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_stable_id"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Stable ID Status"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Indicates if the path and ll_uuid values have changed during the last refresh from the county. A value of 'preserved' means the 'll_uuid' was matched during county refresh to the previous data. A 'null' indicates a new ll_uuid was generated because the new data was not matched to the existing data during the county data refresh process."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"preserved (if unchanged)"</span><span class="p">,</span><span class="w">
                </span><span class="kc">null</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"uuid"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid UUID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Uniquely identifies a single parcel with a v4 uuid. A stable parcel id across county data refreshes. This field should be used for tracking individual parcels."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"4cc9eda6-883c-4f38-9a07-b44900a64b16"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_stack_uuid"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Parcel Stack UUID"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Uniquely identifies a group of parcels with exact duplicate geometries using one stack member parcel's ll_uuid assigned to all the parcels in the stack. This field should be used for identifying and working with groups of stacked parcels (parcels with exactly duplicated parcel geometry). The parcel ll_uuid chosen for the ll_stack_uuid is arbitrary and does not indicate a primary parcel."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"4cc9eda6-883c-4f38-9a07-b44900a64b16"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_row_parcel"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Regrid Right-of-Way Parcel Flag"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Identifies a parcel as being a likely right-of-way parcel. These are usually roads, streetsets, railways, utilities, rivers, etc. Values are text strings identifying the trait of the parcel that led to it being flagged."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"parcel_number"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"land_use"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"perimeter_ratio"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"hull_ratio"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_row_parcel_dev"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ROW Parcel Dev Column"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Development column for the ROW flag. Not delivered to clients."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"Y"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"proposed"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"internal_only"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"ll_updated_at"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"timestamp with time zone"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Last Modified"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Timestamp of the last modification of any kind to this row."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"2019-06-06 12:45:21.285102-04"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"basic"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"core"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"v1"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"placekey"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Placekey"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Full description TK"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"examples"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"227-223@5vg-82n-pgk"</span><span class="w">
            </span><span class="p">],</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_activity"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Activity"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Actual activity on land, eg farming, shopping, manufacturing."</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_activity_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Activity"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Description of the LBCS numeric code"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_function"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Function"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Economic function or type of establishment, eg agricultural, commercial, industrial"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_function_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Function"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Economic function or type of establishment, eg agricultural, commercial, industrial"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_structure"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Structure"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Type of structure or building, eg single-family house, office building, warehouse"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_structure_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Structure"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Type of structure or building, eg single-family house, office building, warehouse"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_site"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Site"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"What is on the land"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_site_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Site"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"What is on the land"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_ownership"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"numeric"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code: Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ownership structure, eg public, private"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"lbcs_ownership_desc"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"text"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"human"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Land Use Code Description: Ownership"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Ownership structure, eg public, private"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tier"</span><span class="p">:</span><span class="w"> </span><span class="s2">"premium"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"categories"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                </span><span class="s2">"lbcs"</span><span class="p">,</span><span class="w">
                </span><span class="s2">"premium"</span><span class="w">
            </span><span class="p">]</span><span class="w">
        </span><span class="p">}</span><span class="w">
    </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
    </span></code></pre></figure>

  
</details>

<h2 id="metadata">Metadata</h2>

<h3 id="county-metadata-verse">County Metadata (Verse)</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/us/verse</code></strong></p>

<p>This endpoint retrieves all records from our <a href="/parcel-data/verse">verse schema</a>. These records are counties in the United States and Puerto Rico that tell the last time we did a full data pull from the source. Occasionally these records are of cities when that is how data is reported.</p>

<p>Note for bulk data customers: This endpoint may reflect data updates before they are available in bulk files. The verse file included with your bulk data deliveries will always reflect the current state of data available to you.</p>

<p><strong>HTTP API request general form</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /api/v2/us/verse
</code></pre></div></div>

<p><strong>Query parameters</strong></p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code> (optional): Default false. Features are returned without geometry values. This reduces the payload size significantly when only field data is required.</li>
</ul>

<p><strong>Example API request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/us/verse?return_geometry=true
</code></pre></div></div>

<p><strong>Example results</strong></p>

<details>
<summary><strong>Example response:</strong></summary>
  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"verse"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="err">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                      </span><span class="p">{</span><span class="w">
              </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
              </span><span class="nl">"geometry"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                  </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Polygon"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"coordinates"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
                      </span><span class="p">[</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-96.90121</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.090481</span><span class="w">
                          </span><span class="p">],</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-97.368404</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.090922</span><span class="w">
                          </span><span class="p">],</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-97.367724</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.351861</span><span class="w">
                          </span><span class="p">],</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-97.017789</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.351347</span><span class="w">
                          </span><span class="p">],</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-97.01773</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.264453</span><span class="w">
                          </span><span class="p">],</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-96.822497</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.264292</span><span class="w">
                          </span><span class="p">],</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-96.82367</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.090411</span><span class="w">
                          </span><span class="p">],</span><span class="w">
                          </span><span class="p">[</span><span class="w">
                              </span><span class="mf">-96.90121</span><span class="p">,</span><span class="w">
                              </span><span class="mf">42.090481</span><span class="w">
                          </span><span class="p">]</span><span class="w">
                      </span><span class="p">]</span><span class="w">
                  </span><span class="p">]</span><span class="w">
              </span><span class="p">},</span><span class="w">
              </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                  </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">1945</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/ne/wayne"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"county"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Wayne"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"state"</span><span class="p">:</span><span class="w"> </span><span class="s2">"NE"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"seat"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Wayne"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"population"</span><span class="p">:</span><span class="w"> </span><span class="mi">9367</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"sqmi"</span><span class="p">:</span><span class="w"> </span><span class="mi">444</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"31179"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"city"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"table_name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ne_wayne20210209"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"total_objects"</span><span class="p">:</span><span class="w"> </span><span class="mi">6630</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2021-02-15"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"canonical_path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/ne/wayne"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"filename_stem"</span><span class="p">:</span><span class="w"> </span><span class="s2">"ne_wayne"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"date_added"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"shapefile_size_flag"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"assessor_data_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2018-03-01"</span><span class="p">,</span><span class="w">
                  </span><span class="nl">"usps_data_date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2022-01-01"</span><span class="w">
              </span><span class="p">},</span><span class="w">
              </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">1945</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="err">...</span><span class="w">
    </span><span class="p">]</span><span class="w">
  </span><span class="p">}</span><span class="w">
  </span></code></pre></figure>

</details>

<h3 id="canada-metadata-verse">Canada Metadata (Verse)</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/ca/verse</code></strong></p>

<p>This endpoint retrieves all records from our <a href="/parcel-data/verse">verse schema</a>. These records indicate the last time we did a full data pull from the source. Occasionally these records are of cities when that is how data is reported.</p>

<p>Note for bulk data customers: This endpoint may reflect data updates before they are available in bulk files. The verse file included with your bulk data deliveries will always reflect the current state of data available to you.</p>

<p><strong>HTTP API request general form</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /api/v2/ca/verse
</code></pre></div></div>

<p><strong>Query parameters</strong></p>

<ul>
  <li><code class="language-plaintext highlighter-rouge">return_geometry</code> (optional): Default false. Features are returned without geometry values. This reduces the payload size significantly when only field data is required.</li>
</ul>

<p><strong>Example API request</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/ca/verse?return_geometry=true
</code></pre></div></div>

<p><strong>Example results</strong></p>

<details>
<summary><strong>Example response:</strong></summary>
  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
    </span><span class="nl">"verse"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"FeatureCollection"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
            </span><span class="p">{</span><span class="w">
                </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Feature"</span><span class="p">,</span><span class="w">
                </span><span class="nl">"properties"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                    </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">4142</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/ca/qc/therese-de-blainville"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"admin0"</span><span class="p">:</span><span class="w"> </span><span class="s2">"CA"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"admin1"</span><span class="p">:</span><span class="w"> </span><span class="s2">"QC"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"admin2"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Thérèse-De Blainville"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"admin2_slug"</span><span class="p">:</span><span class="w"> </span><span class="s2">"therese-de-blainville"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"admin3"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"admin2_center"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"sqmi"</span><span class="p">:</span><span class="w"> </span><span class="mi">81</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"sqkm"</span><span class="p">:</span><span class="w"> </span><span class="mi">211</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"usps_data_date"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"population"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"geoid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2473"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"table_name"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"total_objects"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"last_refresh"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"canonical_path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/ca/qc/therese-de-blainville"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"filename_stem"</span><span class="p">:</span><span class="w"> </span><span class="s2">"qc_therese_de_blainville"</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"date_added"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"shapefile_size_flag"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
                    </span><span class="nl">"assessor_data_date"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="w">
                </span><span class="p">},</span><span class="w">
                </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">4142</span><span class="w">
            </span><span class="p">},</span><span class="w">
          </span><span class="err">...</span><span class="w">
    </span><span class="p">]</span><span class="w">
  </span><span class="p">}</span><span class="w">
  </span></code></pre></figure>

</details>

<hr>

<h3 id="api-account-usage">API Account Usage</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/usage</code></strong></p>

<p>Check your current API usage stats to see how many requests, parcel records, and tiles have been used.
You can see full history with the parameter <code class="language-plaintext highlighter-rouge">return_full_history</code> or specify a specific date range.</p>

<p><strong>HTTP API request general form</strong></p>

<p><code class="language-plaintext highlighter-rouge">GET /api/v2/usage?token=&lt;token&gt;</code></p>

<p><strong>Query parameters</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid assigned authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">return_full_history</code> (optional): Set to <code class="language-plaintext highlighter-rouge">true</code> if you would like API usage history that goes beyond your current monthly cycle.</li>
  <li><code class="language-plaintext highlighter-rouge">begin_date</code>: (optional) Date type formatted as 'YYYY/MM/DD' returns the usage from the specified beginning date to current date unless <code class="language-plaintext highlighter-rouge">end_date</code>` is used.</li>
  <li><code class="language-plaintext highlighter-rouge">end_date</code>: (optional) Date type formatted as 'YYYY/MM/DD' returns the usage for all usage up until the specified ending date unless <code class="language-plaintext highlighter-rouge">begin_date</code> is used and when.</li>
  <li><code class="language-plaintext highlighter-rouge">return_by_token</code>: (optional) returns usage by all available tokens. See <code class="language-plaintext highlighter-rouge">by_token</code> array in response of each token's usage data.</li>
  <li><code class="language-plaintext highlighter-rouge">return_by_this_token</code>: (optional) returns usage for only this token.</li>
</ul>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">cycle_dates</code>: The start and end date of the current cycle.</li>
  <li><code class="language-plaintext highlighter-rouge">cycle_usage</code>: Counts of <code class="language-plaintext highlighter-rouge">requests</code>, <code class="language-plaintext highlighter-rouge">results</code>, and <code class="language-plaintext highlighter-rouge">tiles</code> used during the current cycle.</li>
  <li><code class="language-plaintext highlighter-rouge">full_history</code>: An array of stats for previous cycles. Only included if the optional <code class="language-plaintext highlighter-rouge">return_full_history</code> boolean query parameter is set to <code class="language-plaintext highlighter-rouge">true</code>.</li>
  <li><code class="language-plaintext highlighter-rouge">by_token</code>: An array of usage data by each token. Keys include token 'name', 'token_fragment' the last few characters of the token, 'cycle_usage' object and 'full_history' array.</li>
</ul>

<p><strong>Example request:</strong></p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET https://app.regrid.com/api/v2/usage?token=&lt;token&gt;&amp;full_history=true
</code></pre></div></div>

<details>
<summary><strong>Example response:</strong></summary>

  
<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="w">  </span><span class="p">{</span><span class="w">
  </span><span class="nl">"usage"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"cycle_dates"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
      </span><span class="nl">"begin"</span><span class="p">:</span><span class="w"> </span><span class="mi">1693269014</span><span class="p">,</span><span class="w">
      </span><span class="nl">"end"</span><span class="p">:</span><span class="w"> </span><span class="mi">1695947414</span><span class="w">
    </span><span class="p">},</span><span class="w">
    </span><span class="nl">"cycle_usage"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
      </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">710</span><span class="p">,</span><span class="w">
      </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">1119</span><span class="p">,</span><span class="w">
      </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
      </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
      </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
      </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">489</span><span class="p">,</span><span class="w">
      </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">28646786</span><span class="p">,</span><span class="w">
        </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">7078.775</span><span class="p">,</span><span class="w">
        </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">11.0606</span><span class="w">
      </span><span class="p">},</span><span class="w">
      </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">129</span><span class="p">,</span><span class="w">
      </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="w">
    </span><span class="p">},</span><span class="w">
    </span><span class="nl">"date_range"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
      </span><span class="nl">"begin_ts"</span><span class="p">:</span><span class="w"> </span><span class="mi">1641038400</span><span class="p">,</span><span class="w">
      </span><span class="nl">"begin"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2022-1-1"</span><span class="p">,</span><span class="w">
      </span><span class="nl">"end"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-18"</span><span class="p">,</span><span class="w">
      </span><span class="nl">"total"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
        </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">1506</span><span class="p">,</span><span class="w">
        </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">3774</span><span class="p">,</span><span class="w">
        </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">10833</span><span class="p">,</span><span class="w">
        </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">2392</span><span class="p">,</span><span class="w">
        </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">8</span><span class="p">,</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">282</span><span class="p">,</span><span class="w">
        </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">2379</span><span class="p">,</span><span class="w">
        </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">28646786</span><span class="p">,</span><span class="w">
          </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">7078.775</span><span class="p">,</span><span class="w">
          </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">11.0606</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
      </span><span class="p">}</span><span class="w">
    </span><span class="p">},</span><span class="w">
    </span><span class="nl">"by_token"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
      </span><span class="p">{</span><span class="w">
        </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Automatically Provisioned"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"token_fragment"</span><span class="p">:</span><span class="w"> </span><span class="s2">"..."</span><span class="p">,</span><span class="w">
        </span><span class="nl">"cycle_usage"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="err">...</span><span class="p">},</span><span class="w">
        </span><span class="nl">"full_history"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="err">...</span><span class="p">]</span><span class="w">
      </span><span class="p">}</span><span class="w">
    </span><span class="p">],</span><span class="w">
    </span><span class="nl">"full_history"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
      </span><span class="p">{</span><span class="w">
        </span><span class="nl">"begin_ts"</span><span class="p">:</span><span class="w"> </span><span class="mi">1693269014</span><span class="p">,</span><span class="w">
        </span><span class="nl">"begin"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-8-28"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"end"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-28"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"total"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">710</span><span class="p">,</span><span class="w">
          </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">1119</span><span class="p">,</span><span class="w">
          </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
          </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
          </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">1150</span><span class="p">,</span><span class="w">
          </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">1454</span><span class="p">,</span><span class="w">
          </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">489</span><span class="p">,</span><span class="w">
          </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
          </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">28646786</span><span class="p">,</span><span class="w">
            </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">7078.775</span><span class="p">,</span><span class="w">
            </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">11.0606</span><span class="w">
          </span><span class="p">}</span><span class="w">
        </span><span class="p">},</span><span class="w">
        </span><span class="nl">"overage"</span><span class="p">:</span><span class="w"> </span><span class="p">{},</span><span class="w">
        </span><span class="nl">"counts"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">65</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">129</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">10</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">65</span><span class="p">,</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-18"</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-17"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">13</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">22</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">39</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">10</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">3460</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.855</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.0013</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-16"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-15"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">3</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">3</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">5</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">5</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">3</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-14"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-13"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-12"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">3</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-11"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">31</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">53</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">50</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">192</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">18</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">10380</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">2.565</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.004</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-10"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-9"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-8"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-7"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">529</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">521</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">521</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-6"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">35</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">136</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">184</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">381</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">115</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">1642936</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">405.9783</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.6343</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-5"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">21</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">55</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">110</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">12</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">55</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-4"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-3"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-2"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-9-1"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-8-31"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">55</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">153</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">255</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">502</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">127</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">132024</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">32.6238</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">0.051</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-8-30"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">16</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">116</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">174</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">16</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">96</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">26857986</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mf">6636.7529</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mf">10.3699</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-8-29"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">},</span><span class="w">
          </span><span class="p">{</span><span class="w">
            </span><span class="nl">"date"</span><span class="p">:</span><span class="w"> </span><span class="s2">"2023-8-28"</span><span class="p">,</span><span class="w">
            </span><span class="nl">"requests"</span><span class="p">:</span><span class="w"> </span><span class="mi">3</span><span class="p">,</span><span class="w">
            </span><span class="nl">"results"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
            </span><span class="nl">"tiles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"buildings"</span><span class="p">:</span><span class="w"> </span><span class="mi">4</span><span class="p">,</span><span class="w">
            </span><span class="nl">"addresses"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
            </span><span class="nl">"typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"a_typeahead"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"ownership"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
            </span><span class="nl">"area"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
              </span><span class="nl">"sq_meters"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"acres"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w">
              </span><span class="nl">"sq_miles"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
            </span><span class="p">}</span><span class="w">
          </span><span class="p">}</span><span class="w">
        </span><span class="p">],</span><span class="w">
        </span><span class="nl">"current"</span><span class="p">:</span><span class="w"> </span><span class="kc">true</span><span class="p">,</span><span class="w">
        </span><span class="nl">"paid"</span><span class="p">:</span><span class="w"> </span><span class="kc">false</span><span class="p">,</span><span class="w">
        </span><span class="nl">"trial"</span><span class="p">:</span><span class="w"> </span><span class="kc">false</span><span class="w">
      </span><span class="p">}</span><span class="w">
    </span><span class="p">]</span><span class="w">
  </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
  </span></code></pre></figure>


</details>
<hr>

<h3 id="report-data-issues">Report Data Issues</h3>
<p><strong><code class="language-plaintext highlighter-rouge">api/v2/report</code></strong></p>

<p>You can report issues to Regrid of specific parcel records or general areas to us
using this report endpoint. Reports help us prioritize updates.
However, we cannot apply data received to this endpoint directly to our
parcel data or respond individually to specific reports.</p>

<p><strong>HTTP API request general form</strong></p>

<p><code class="language-plaintext highlighter-rouge">POST /api/v2/report?token=&lt;token&gt;</code></p>

<p><strong>Query parameters</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">token</code>: Your Regrid authorization token.</li>
  <li><code class="language-plaintext highlighter-rouge">path</code>: Represents the path for the '/country code/state_id/county_slug' or 'admin0/admin1/admin2' as defined by the US and International Regrid Schemas.</li>
  <li><code class="language-plaintext highlighter-rouge">ll_uuid</code> (optional): The ll_uuid of a parcel, if the report is for a specific parcel</li>
  <li><code class="language-plaintext highlighter-rouge">comment</code> (optional): String describing the issue</li>
  <li><code class="language-plaintext highlighter-rouge">details</code> (optional): A hash with details on specific fields. This hash only accepts <a href="https://docs.google.com/spreadsheets/d/14RcBKyiEGa7q-SR0rFnDHVcovb9uegPJ3sfb3WlNPc0/edit#gid=1010834424">standard column names</a> as keys.</li>
</ul>

<p><strong>Response fields</strong></p>
<ul>
  <li><code class="language-plaintext highlighter-rouge">message</code>: Message on the status of the report.</li>
  <li><code class="language-plaintext highlighter-rouge">id</code>: ID of the new report.</li>
</ul>

<p><strong>Example request</strong></p>

<p><code class="language-plaintext highlighter-rouge">POST https://app.regrid.com/api/v2/report?token=YOUR_TOKEN_HERE</code></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span><span class="w">
  </span><span class="nl">"path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/us/al/elmore/eclectic/5"</span><span class="p">,</span><span class="w">
  </span><span class="nl">"ll_uuid"</span><span class="p">:</span><span class="w"> </span><span class="s2">"8ba95684-e001-4362-801c-39f30a13bee4"</span><span class="p">,</span><span class="w">
  </span><span class="nl">"comment"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Property has a new owner"</span><span class="p">,</span><span class="w">
  </span><span class="nl">"details"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"owner"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Johnny Parcel"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"saleprice"</span><span class="p">:</span><span class="w"> </span><span class="mi">200000</span><span class="w">
  </span><span class="p">}</span><span class="w">
</span><span class="p">}</span></code></pre></figure>

<p><strong>Example response</strong></p>

<figure class="highlight"><pre><code class="language-json" data-lang="json"><span class="p">{</span><span class="w">
    </span><span class="nl">"message"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Report received"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">2238</span><span class="w">
</span><span class="p">}</span></code></pre></figure>