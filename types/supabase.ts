export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          id: string
          name: string
          slug: string
          bio: string | null
          image_url: string | null
          genre: string | null
          spotify_url: string | null
          soundcloud_url: string | null
          instagram_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          bio?: string | null
          image_url?: string | null
          genre?: string | null
          spotify_url?: string | null
          soundcloud_url?: string | null
          instagram_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          bio?: string | null
          image_url?: string | null
          genre?: string | null
          spotify_url?: string | null
          soundcloud_url?: string | null
          instagram_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      artist_releases: {
        Row: {
          artist_id: string
          release_id: string
        }
        Insert: {
          artist_id: string
          release_id: string
        }
        Update: {
          artist_id?: string
          release_id?: string
        }
      }
      event_artists: {
        Row: {
          event_id: string
          artist_id: string
        }
        Insert: {
          event_id: string
          artist_id: string
        }
        Update: {
          event_id?: string
          artist_id?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          image_url: string | null
          event_date: string
          location: string
          venue: string
          ticket_url: string | null
          max_tickets: number | null
          tickets_sold: number
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          image_url?: string | null
          event_date: string
          location: string
          venue: string
          ticket_url?: string | null
          max_tickets?: number | null
          tickets_sold?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          event_date?: string
          location?: string
          venue?: string
          ticket_url?: string | null
          max_tickets?: number | null
          tickets_sold?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          is_verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          is_verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_verified?: boolean
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      releases: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          cover_url: string | null
          release_date: string
          spotify_url: string | null
          apple_music_url: string | null
          soundcloud_url: string | null
          beatport_url: string | null
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          cover_url?: string | null
          release_date: string
          spotify_url?: string | null
          apple_music_url?: string | null
          soundcloud_url?: string | null
          beatport_url?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          cover_url?: string | null
          release_date?: string
          spotify_url?: string | null
          apple_music_url?: string | null
          soundcloud_url?: string | null
          beatport_url?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          event_id: string
          user_id: string
          ticket_code: string
          is_used: boolean
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          ticket_code: string
          is_used?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          ticket_code?: string
          is_used?: boolean
          created_at?: string
        }
      }
    }
  }
}
