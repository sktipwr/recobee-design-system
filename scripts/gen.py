#!/usr/bin/env python3
"""Generate faithful web-recreation Storybook stories for all placeholder components."""
import os, json

STORIES = "/Users/sktipwr/RecoBee/design-system/stories/components"

# Design tokens
BG = "#121212"
SURFACE = "#1E1E1E"
CARD = "#272727"
CARD2 = "#424242"
GOLD = "#E9C638"
WHITE = "#F8F8F9"
WHITE2 = "#EEEEEE"
GREY1 = "#9E9E9E"
GREY2 = "#757575"
GREY3 = "#BDBDBD"
GREY4 = "#616161"
BLACK = "#000000"
RED = "#E53935"
GREEN = "#388E3C"

def font(size, weight=400):
    return f"fontFamily: 'DM Sans, sans-serif', fontSize: {size}, fontWeight: {weight}"

# Check if file is a placeholder (contains &lt; which means it just shows <ComponentName />)
def is_placeholder(filepath):
    with open(filepath) as f:
        content = f.read()
    return '&lt;' in content and 'argTypes' not in content

# Component definitions: name -> (category, description, render_jsx, argTypes_dict)
# render_jsx is the full component function as a string
COMPONENTS = {}

def add(name, category, desc, render, argtypes=None):
    COMPONENTS[name] = (category, desc, render, argtypes or {})

# ═══ CARDS ═══
add("AIReviewCard", "Cards", "AI-generated movie review summary card", """({rating = 8.2, movieTitle = 'Inception', review = 'A mind-bending masterpiece that challenges reality...'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, border: '1px solid #424242' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, #F9FE11, #FF9A3D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'DM Sans' }}>AI</div>
      <span style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>AI Review</span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ color: '#E9C638', fontSize: 14 }}>★</span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>{rating}</span>
      </div>
    </div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', marginBottom: 8 }}>{movieTitle}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#9E9E9E', lineHeight: '20px' }}>{review}</div>
  </div>
)""", {"rating": "number", "movieTitle": "text", "review": "text"})

add("ActivityMovieCard", "Cards", "Movie card shown in social activity feed", """({title = 'Dune: Part Two', year = '2024', activityType = 'Reviewed', userName = 'Ankit', time = '2h ago'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, color: '#E9C638' }}>{activityType}</span>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>{time}</span>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ width: 51, height: 32, borderRadius: 3, backgroundColor: '#424242' }} />
      <div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>{title}</div>
        <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#9E9E9E' }}>{year}</span>
      </div>
    </div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#BDBDBD', marginTop: 8 }}>{userName} reviewed this movie</div>
  </div>
)""", {"title": "text", "year": "text", "activityType": "text", "userName": "text", "time": "text"})

add("AudienceSentimentCard", "Cards", "Audience sentiment/buzz meter for movies", """({positive = 72, neutral = 18, negative = 10}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 16 }}>Audience Sentiment</div>
    <div style={{ display: 'flex', gap: 12 }}>
      {[{l:'Positive',v:positive,c:'#388E3C'},{l:'Neutral',v:neutral,c:'#E9C638'},{l:'Negative',v:negative,c:'#E53935'}].map((s: any) => (
        <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Sans', fontSize: 24, fontWeight: 700, color: s.c }}>{s.v}%</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#9E9E9E', marginTop: 4 }}>{s.l}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', marginTop: 16 }}>
      <div style={{ width: positive+'%', backgroundColor: '#388E3C' }} />
      <div style={{ width: neutral+'%', backgroundColor: '#E9C638' }} />
      <div style={{ width: negative+'%', backgroundColor: '#E53935' }} />
    </div>
  </div>
)""", {"positive": {"control": {"type": "range", "min": 0, "max": 100}}, "neutral": {"control": {"type": "range", "min": 0, "max": 100}}, "negative": {"control": {"type": "range", "min": 0, "max": 100}}})

add("AutoCompSearchCard", "Cards", "Autocomplete search result card", """({title = 'The Dark Knight', subtitle = '2008 · Action, Crime', type = 'movie'}: any) => (
  <div style={{ width: 343, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: 8 }}>
    <div style={{ width: 40, height: 56, borderRadius: 4, backgroundColor: '#424242', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>{title}</div>
      <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{subtitle}</div>
    </div>
    <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575', textTransform: 'uppercase' }}>{type}</span>
  </div>
)""", {"title": "text", "subtitle": "text", "type": "text"})

# Now generate a generic template for ALL remaining placeholders
# Based on component name patterns, create appropriate renders

def make_generic_render(name, desc, category):
    """Generate a reasonable render based on component name patterns."""
    is_modal = 'Modal' in name or 'modal' in name
    is_carousel = 'Carousel' in name
    is_skeleton = 'Skeleton' in name
    is_form = 'Update' in name or 'Upsert' in name
    is_list = 'List' in name or 'Rail' in name
    is_btn = 'Btn' in name or 'Button' in name
    is_card = 'Card' in name
    is_share = 'Share' in name
    is_info = 'Info' in name
    pretty = ''.join(' ' + c if c.isupper() else c for c in name).strip()

    if is_skeleton:
        return f"""(props: any) => (
  <div style={{{{ width: 343, padding: 16 }}}}>
    <style>{{`@keyframes shimmer {{ 0% {{ background-position: -343px 0 }} 100% {{ background-position: 343px 0 }} }}`}}</style>
    <div style={{{{ display: 'flex', gap: 12 }}}}>
      <div style={{{{ width: 50, height: 72, borderRadius: 6, background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }}}} />
      <div style={{{{ flex: 1 }}}}>
        <div style={{{{ height: 14, borderRadius: 4, marginBottom: 8, width: '70%', background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }}}} />
        <div style={{{{ height: 10, borderRadius: 4, width: '50%', background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }}}} />
        <div style={{{{ height: 10, borderRadius: 4, width: '35%', marginTop: 8, background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }}}} />
      </div>
    </div>
  </div>
)"""
    elif is_modal:
        modal_title = pretty.replace(' Modal Body', '').replace(' Modal', '')
        return f"""(props: any) => (
  <div style={{{{ width: 300, backgroundColor: '#272727', borderRadius: 12, padding: 24 }}}}>
    <div style={{{{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}}}>
      <span style={{{{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9' }}}}>{modal_title}</span>
      <button style={{{{ background: 'none', border: 'none', color: '#9E9E9E', cursor: 'pointer', fontSize: 16 }}}}>✕</button>
    </div>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 14, color: '#BDBDBD', lineHeight: '22px', marginBottom: 16 }}}}>{desc}</div>
    <button style={{{{ width: '100%', height: 36, borderRadius: 8, backgroundColor: '#E9C638', border: 'none', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#121212', cursor: 'pointer' }}}}>Got it</button>
  </div>
)"""
    elif is_carousel:
        carousel_title = pretty.replace(' Carousel', '')
        return f"""(props: any) => (
  <div style={{{{ width: 375, padding: '0 16px' }}}}>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 12 }}}}>{carousel_title}</div>
    <div style={{{{ display: 'flex', gap: 12, overflow: 'auto' }}}}>
      {{[1,2,3,4].map((i: number) => (
        <div key={{i}} style={{{{ width: 200, height: 120, borderRadius: 12, backgroundColor: '#1E1E1E', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}}}>
          <span style={{{{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575' }}}}>Slide {{i}}</span>
        </div>
      ))}}
    </div>
    <div style={{{{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}}}>
      {{[0,1,2,3].map((i: number) => <div key={{i}} style={{{{ width: i===0?16:6, height: 6, borderRadius: 3, backgroundColor: i===0?'#E9C638':'#424242' }}}} />)}}
    </div>
  </div>
)"""
    elif is_form:
        form_title = pretty
        return f"""(props: any) => (
  <div style={{{{ width: 343, padding: 16 }}}}>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 16 }}}}>{form_title}</div>
    {{['Field 1', 'Field 2'].map((f: string) => (
      <div key={{f}} style={{{{ marginBottom: 12 }}}}>
        <div style={{{{ fontFamily: 'DM Sans', fontSize: 12, fontWeight: 700, color: '#BDBDBD', marginBottom: 4 }}}}>{{f}}</div>
        <div style={{{{ height: 40, borderRadius: 8, backgroundColor: '#424242', padding: '0 12px', display: 'flex', alignItems: 'center' }}}}>
          <span style={{{{ fontFamily: 'DM Sans', fontSize: 14, color: '#9E9E9E' }}}}>Enter value...</span>
        </div>
      </div>
    ))}}
    <button style={{{{ width: '100%', height: 40, borderRadius: 8, backgroundColor: '#E9C638', border: 'none', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#121212', cursor: 'pointer', marginTop: 8 }}}}>Save</button>
  </div>
)"""
    elif is_share:
        return f"""({{title = '{pretty}'}}: any) => (
  <div style={{{{ width: 280, backgroundColor: '#121212', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #424242' }}}}>
    <div style={{{{ fontSize: 32, marginBottom: 12 }}}}>📤</div>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9' }}}}>{{title}}</div>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 8 }}}}>Shared via RecoBee</div>
  </div>
)"""
    elif is_card:
        return f"""({{title = '{pretty}'}}: any) => (
  <div style={{{{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}}}>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}}}>{{title}}</div>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}}}>{desc}</div>
  </div>
)"""
    elif is_list:
        return f"""(props: any) => (
  <div style={{{{ width: 343 }}}}>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 12 }}}}>{pretty}</div>
    {{[1,2,3].map((i: number) => (
      <div key={{i}} style={{{{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #424242' }}}}>
        <div style={{{{ width: 50, height: 72, borderRadius: 6, backgroundColor: '#424242', flexShrink: 0 }}}} />
        <div>
          <div style={{{{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}}}>Item {{i}}</div>
          <div style={{{{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 4 }}}}>Subtitle text</div>
        </div>
      </div>
    ))}}
  </div>
)"""
    elif is_btn:
        btn_label = pretty.replace(' Btn', '').replace(' Button', '')
        return f"""({{label = '{btn_label}'}}: any) => (
  <button style={{{{ padding: '8px 20px', borderRadius: 8, backgroundColor: '#E9C638', border: 'none', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#121212', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}}}>
    {{label}}
  </button>
)"""
    else:
        return f"""(props: any) => (
  <div style={{{{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}}}>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}}}>{pretty}</div>
    <div style={{{{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}}}>{desc}</div>
  </div>
)"""


def write_story(name, category, desc, render, argtypes):
    """Write a single .stories.tsx file."""
    argtypes_str = ""
    if argtypes:
        entries = []
        for k, v in argtypes.items():
            if isinstance(v, str):
                entries.append(f"{k}: {{ control: '{v}' }}")
            elif isinstance(v, dict):
                entries.append(f"{k}: {json.dumps(v)}")
        if entries:
            argtypes_str = f"\n  argTypes: {{ {', '.join(entries)} }},"

    source_folder = {
        'Cards': 'Cards', 'Modals': 'Modals', 'Skeletons': 'Skeletons',
        'Carousels': 'Carousels', 'Lists': 'List', 'MetadataEntries': 'MetadataEntries'
    }.get(category, 'Common')

    content = f"""import React from 'react';
import type {{ Meta, StoryObj }} from '@storybook/react-vite';

const {name} = {render};

const meta: Meta<typeof {name}> = {{
  title: '{category}/{name}',
  component: {name},
  tags: ['autodocs'],
  parameters: {{
    layout: 'centered',
    backgrounds: {{ default: 'dark' }},
    docs: {{
      description: {{
        component: '{desc.replace(chr(39), chr(92)+chr(39))}\\n\\n**Source:** `src/components/{source_folder}/{name}.tsx`',
      }},
    }},
  }},{argtypes_str}
}};
export default meta;
type Story = StoryObj<typeof {name}>;

export const Default: Story = {{}};
"""
    filepath = os.path.join(STORIES, f"{name}.stories.tsx")
    with open(filepath, 'w') as f:
        f.write(content)


# Get list of placeholder files
generated = 0
skipped = 0

for filename in sorted(os.listdir(STORIES)):
    if not filename.endswith('.stories.tsx'):
        continue
    name = filename.replace('.stories.tsx', '')
    filepath = os.path.join(STORIES, filename)

    if not is_placeholder(filepath):
        skipped += 1
        continue

    # Check if we have a specific definition
    if name in COMPONENTS:
        cat, desc, render, argtypes = COMPONENTS[name]
    else:
        # Generate based on name patterns
        if 'Card' in name or 'Share' in name:
            cat = 'Cards'
        elif 'Modal' in name or 'modal' in name:
            cat = 'Modals'
        elif 'Skeleton' in name:
            cat = 'Skeletons'
        elif 'Carousel' in name:
            cat = 'Carousels'
        elif 'List' in name or 'Rail' in name:
            cat = 'Lists'
        elif 'Update' in name or 'Upsert' in name:
            cat = 'MetadataEntries'
        else:
            cat = 'Components'

        # Get description from existing file
        with open(filepath) as f:
            content = f.read()
        import re
        m = re.search(r"component: '(.*?)\\n", content)
        desc = m.group(1) if m else f'{name} component'
        render = make_generic_render(name, desc, cat)
        argtypes = {}

    write_story(name, cat, desc, render, argtypes)
    generated += 1

print(f"Generated: {generated} | Skipped (real): {skipped}")
total = len([f for f in os.listdir(STORIES) if f.endswith('.stories.tsx')])
print(f"Total story files: {total}")
