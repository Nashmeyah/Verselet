class PoemsController < ApplicationController
  before_action :set_poem, only: [:show, :update, :destroy]

  # GET /poems
  def index
    poems = Poem.all

    render json: poems
  end

  # GET /poems/1
  def show
    render json: @poem
  end

  # POST /poems
  def create
    @poem = Poem.new(poem_params)

    if @poem.save
      render json: @poem, status: :created, location: @poem
    else
      render json: @poem.errors, status: :unprocessable_entity
    end
  end

  

  # DELETE /poems/1
  def destroy
    @poem.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_poem
      @poem = Poem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def poem_params
      params.require(:poem).permit(:title, :body, :poet_id)
    end
end
